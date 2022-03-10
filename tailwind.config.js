module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {
      colors: {
        //for navbar
        'gray_1': '#0f0f0f',
        'dark-emerald':'#012620',
        // for bg
        'dark-blue':'#14171e',
        'not-dark-blue': '#161616',

      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
