// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      yellow: "#FFDE00",
      "white-50": "rgba(255,255,255,.5)",
      "black-50": "rgba(0,0,0,.5)",
      "black-75": "rgba(0,0,0,.75)"
    }
  },
  variants: {
    borderWidth: ["responsive", "hover", "focus"]
  }
}
