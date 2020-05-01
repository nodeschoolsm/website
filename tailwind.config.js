const dark = { full: "black" }
const light = { full: "white" }
;[...Array(19)].map((_, i) => {
  const amount = (0.05 + i * 0.05).toFixed(2)
  dark[amount.split(".")[1]] = `rgba(0,0,0,${amount})`
  light[amount.split(".")[1]] = `rgba(255,255,255,${amount})`
})
const pxHelpers = {}
;[...Array(5)].map((e, i) => {
  const name = `${i + 1}px`
  pxHelpers[name] = name
})
module.exports = {
  theme: {
    extend: {
      width: pxHelpers,
      height: pxHelpers,
    },
    colors: {
      white: "white",
      yellow: "#FFDE00",
      black: "#000000",
      dark,
      transparent: "rgba(0,0,0,0)",
      light,
    },
  },
  variants: {},
  plugins: [],
}
