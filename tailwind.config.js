import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#1B3160', // Azul marino oscuro del "Esencial"
                    light: '#A4B6CD',   // Azul claro/gris del "HOGAR"
                },
                secondary: {
                    DEFAULT: '#17937C',  // Verde turquesa de "calidez en tu vida"
                    accent: '#FFD700',   // Amarillo de las líneas decorativas
                },
            },
        },
    },

    plugins: [forms],
};
