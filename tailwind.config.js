const dark = {}
const light = {}
const pxHelpers = {}
const boxShadow = {}
const pallete = {
  yellow: "#FFDE00"
}
;[...Array(18)].map((_, i) => {
  // * dark-05 ~ dark-10 ~ dark-95
  const amount = (0.05 + i * 0.05).toFixed(2)
  const colorName = amount.split(".")[1]
  dark[colorName] = `rgba(0,0,0,${amount})`
  light[colorName] = `rgba(255,255,255,${amount})`
  if (i < 9) {
    // * w-1px h-1px ~ w-9px h-9px | dark-01 ~ dark-02 ~ dark-09
    const n = i + 1
    const pxName = `${n}px`
    dark[`0${n}`] = `rgba(0,0,0,0.0${n})`
    light[`0${n}`] = `rgba(255,255,255,0.0${n})`
    pxHelpers[pxName] = pxName
  }
})
Object.keys(pallete).map((color) => {
  const value = pallete[color]
  boxShadow[color] = `0 0 0 3px ${value}33`
})
module.exports = {
  purge: ["./pages/**/*.js", "./pages/*.js"],
  theme: {
    extend: {
      width: pxHelpers,
      height: pxHelpers,
      zIndex: {
        1: 1
      },
      boxShadow
    },
    colors: {
      dark,
      light,
      transparent: "transparent",
      ...pallete
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "active", "group-hover"],
    boxShadow: ["hover", "focus", "active"]
  },
  plugins: [],
  futures: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
