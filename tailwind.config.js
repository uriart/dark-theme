/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontSize: {
      'xl': '10vw',
      'l': '5vw',
    },
    extend: {
      backgroundImage: {
        'grey-gradient-radial': 'radial-gradient(closest-side, #444242, #2B2B2B)',
      }
    },
  },
  plugins: [],
}
