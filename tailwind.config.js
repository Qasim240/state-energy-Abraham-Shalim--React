/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#03276B',
        secondary: '#DEDEDE',
        'base': '#1E1E1E',
      },
      fontFamily: {
        Avenir: ['Avenir', 'sans-serif'],
      },
      fontSize: {
        'h1': '30px',
        'sm': "14px"
      },

      borderRadius: {
        md: '8px'
      },

    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
}
