module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // for bg
        'dark-blue':'#14171e',
        'not-dark-blue': '#020024',
        'emerald': '#082f29',
        'dark-emerald':'#012620',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
