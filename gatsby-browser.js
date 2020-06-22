require("prismjs/themes/prism.css")
require("./src/assets/styles.css")
const mediumZoom = require("medium-zoom").default

exports.onInitialClientRender = () => {
  const SELECTOR = `[data-zoomable]`
  if (document.querySelector(SELECTOR)) {
    mediumZoom(SELECTOR)
  }
}
