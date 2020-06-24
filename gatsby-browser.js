require("prismjs/themes/prism.css")
require("./src/assets/styles.css")
const mediumZoom = require("medium-zoom").default

exports.onInitialClientRender = () => {
  const SELECTOR = `[data-zoomable]`
  if (document.querySelector(SELECTOR)) {
    const script = document.createElement("script")
    script.async = true
    script.src = `https://platform.twitter.com/widgets.js`
    document.head.appendChild(script)
    mediumZoom(SELECTOR, {
      margin: 32,
    })
  }
}
