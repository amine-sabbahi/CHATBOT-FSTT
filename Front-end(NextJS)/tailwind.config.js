/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                denim: {
                    50: '#f2f7fd',
                    100: '#e4ecfa',
                    200: '#c2d9f5',
                    300: '#8cb9ed',
                    400: '#4f95e1',
                    500: '#2878cf',
                    600: '#1a5fb4',
                    700: '#164b8e',
                    800: '#164076',
                    900: '#183762',
                    950: '#102341',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
