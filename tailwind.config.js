module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add extra paths here
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark'],
},
}

