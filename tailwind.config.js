module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        mainclr: {
          100: '#032C6A',
          150: '#07234D',
          200: '#040D21',
          300: '#240626'
        },
        cardclr: '#090D2E',
        borderclr: '#CEAF0E'

      },
      fontFamily: {
        snig: ['Sniglet'],
        rev: ['Revalia']
      }
    },
  },
  plugins: [],
}