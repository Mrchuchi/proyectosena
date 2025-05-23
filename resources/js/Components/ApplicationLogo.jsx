export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg">
            {/* Definición de colores */}
            <defs>
                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#0F4C81', stopOpacity: 1 }} /> {/* Rich blue */}
                    <stop offset="100%" style={{ stopColor: '#2C699A', stopOpacity: 1 }} /> {/* Softer blue */}
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                    <feOffset dx="2" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Decorative wave */}
            <path 
                d="M 50,40 C 200,20 400,60 750,40" 
                stroke="url(#textGradient)" 
                strokeWidth="3" 
                fill="none"
                filter="url(#shadow)"
            />

            {/* Main text with enhanced styling */}
            <text 
                x="400" 
                y="120" 
                fontSize="90" 
                fontFamily="Arial, sans-serif" 
                fontWeight="bold" 
                fill="url(#textGradient)"
                textAnchor="middle"
                filter="url(#shadow)"
            >
                Esencial
            </text>
            <text 
                x="400" 
                y="180" 
                fontSize="64" 
                fontFamily="Arial, sans-serif" 
                fontWeight="600" 
                fill="#4B5563"
                textAnchor="middle"
                letterSpacing="0.2em"
            >
                HOGAR
            </text>

            {/* Tagline */}
            <text 
                x="400" 
                y="215" 
                fontSize="24" 
                fontFamily="Arial, sans-serif" 
                fontStyle="italic" 
                fill="#047857"
                textAnchor="middle"
            >
                calidez en tu vida
            </text>

            {/* Decorative bottom wave */}
            <path 
                d="M 50,230 C 200,210 400,250 750,230" 
                stroke="url(#textGradient)" 
                strokeWidth="3" 
                fill="none"
                filter="url(#shadow)"
            />

            {/* Leaf decoration */}
            <g transform="translate(660,120) scale(0.9)" filter="url(#shadow)">
                <path 
                    d="M 0,0 C 20,-20 40,-20 50,0 C 40,20 20,20 0,0" 
                    fill="#047857" 
                />
                <path 
                    d="M 20,10 C 40,-10 60,-10 70,10 C 60,30 40,30 20,10" 
                    fill="#047857" 
                />
            </g>
        </svg>
    );
}
