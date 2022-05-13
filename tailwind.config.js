module.exports = {
  content: ["./node_modules/flowbite/**/*.js"],
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
