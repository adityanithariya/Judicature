/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                navbar: 'linear-gradient(340deg, #2374EE 15.09%, #37A0EA 88.54%)',
            },
            backgroundColor: {
                hover: '#daefff',
            },
            boxShadow: {
                sortDialog1:
                    '0px 1px 8px 0px rgba(0, 0, 0, 0.10), 0px -2px 23px 0px rgba(0, 0, 0, 0.10)',
            },
        },
    },
    plugins: [],
};
