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
            transitionTimingFunction: {
                'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.45, 0, 0.55, 1)',
            },
            rotate: {
                '360': '360deg',
            },
            perspective: {
                'none': 'none',
                '500': '500px',
                '1000': '1000px',
                '2000': '2000px',
            },
            skew: {
                '6': '6deg',
                '12': '12deg',
            },
            transformOrigin: {
                'top': 'top',
                'center': 'center',
            },
            keyframes: {
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                swing: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '20%': { transform: 'rotate(15deg)' },
                    '40%': { transform: 'rotate(-10deg)' },
                    '60%': { transform: 'rotate(5deg)' },
                    '80%': { transform: 'rotate(-5deg)' }
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            },
            animation: {
                'bounce': 'bounce 2s infinite',
                'swing': 'swing 2s infinite',
                'shake': 'shake 0.8s cubic-bezier(.36,.07,.19,.97) infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            },
        },
    },

    plugins: [forms],
};
