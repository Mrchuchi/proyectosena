import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertSvgToIco() {
    try {
        // Read the SVG file
        const inputSvg = join(__dirname, 'public', 'favicon.svg');
        const outputIco = join(__dirname, 'public', 'favicon.ico');

        // Convert SVG to PNG with different sizes (16x16, 32x32, 48x48)
        const sizes = [16, 32, 48];
        const pngBuffers = await Promise.all(
            sizes.map(size => 
                sharp(inputSvg)
                    .resize(size, size)
                    .png()
                    .toBuffer()
            )
        );

        // Create ICO file
        const icoData = Buffer.concat([
            // ICO header
            Buffer.from([0, 0, 1, 0, 3, 0]), // 6 bytes for header
            // Image directory entries (16 bytes each)
            ...sizes.map((size, index) => {
                const buffer = Buffer.alloc(16);
                buffer.writeUInt8(size, 0); // width
                buffer.writeUInt8(size, 1); // height
                buffer.writeUInt8(0, 2); // color palette
                buffer.writeUInt8(0, 3); // reserved
                buffer.writeUInt16LE(1, 4); // color planes
                buffer.writeUInt16LE(32, 6); // bits per pixel
                buffer.writeUInt32LE(pngBuffers[index].length, 8); // image size
                buffer.writeUInt32LE(
                    6 + (16 * 3) + // header size + directory entries
                    pngBuffers.slice(0, index).reduce((sum, buf) => sum + buf.length, 0), // offset
                    12
                );
                return buffer;
            }),
            // Image data
            ...pngBuffers
        ]);

        // Write the ICO file
        writeFileSync(outputIco, icoData);
        console.log('Favicon.ico created successfully!');
    } catch (error) {
        console.error('Error converting favicon:', error);
    }
}

convertSvgToIco();
