module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: { 
    fontFamily:{
      serif:['Montserrat']},
    fontStyle: 'normal',
   
    fontSize: '16px',
    lineHeight: '20px',
    extend: {
      colors: {
        'green':'#258991',
        'black':'#0E1012',
        'light-grey':'#536784',
        'grey':'#324054',
        'dark-grey':'#131823',
        'white':'#FFFFFF',
        //green gradient
        'light-blue': '#419AE8',
        'turquouse':'#298B93',
        'emerald':'#00717A',
        //bg gradient
        'pink':'#E80EED',
        'blue-for-pink':'#03E2F3',
        'blue-1':'#49E8E8',
        'blue-2':'#15DEEE',
        //light theme
        'dark-white': '#ebedf5',
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
