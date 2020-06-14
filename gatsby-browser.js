require("prismjs/themes/prism.css")
require("./src/assets/styles.css")
const mediumZoom = require("medium-zoom").default

exports.onInitialClientRender = () => {
  mediumZoom("[data-zoomable]")
}
