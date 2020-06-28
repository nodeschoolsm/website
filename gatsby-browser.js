const { default: fetch } = require("node-fetch")

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
    document.querySelectorAll(SELECTOR).forEach(img => {
      const source = img.attributes["new-src"].value
      if (source) {
        const { content, type } = JSON.parse(source)
        fetch(`data:${type};base64,${content}`)
          .then(r => r.blob())
          .then(blob => img.setAttribute("src", URL.createObjectURL(blob)))
      }
    })
    mediumZoom(SELECTOR, {
      margin: 24,
    })
  }
}
