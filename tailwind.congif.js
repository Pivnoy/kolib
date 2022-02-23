module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"],
    darkMode: false, 
    theme: {
        colors: {
            'blue': '#486581',
            'orange': '#FFBB55',
            'green': '#3FBD93',
            'grey': '#F0F4F8',
            'white': '#FFFFFF'
        },
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            // serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    variants: {
      extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
  };
  
  