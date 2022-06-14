module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            kelvinDark: '#4b02b3',
            kelvinMedium: '#cdc5fa',
            kelvinLight: '#fcfaff',
            kelvinBlack: '#2f2f2f',
            kelvinBold: '#835AF0',
        }
    }
  },
plugins: [require('flowbite/plugin')],
}
