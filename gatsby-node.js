const PATH = require(`path`)
const cheerio = require("cheerio")
let allPosts = {}
exports.createPages = async ({ graphql, actions }) => {
  graphql(
    `
      {
        allGoogleDocs(filter: { document: { path: { regex: "/about/" } } }) {
          nodes {
            childMarkdownRemark {
              html
            }
            document {
              path
            }
          }
        }
      }
    `
  ).then(async result => {
    const profiles = {}
    for (item of result.data.allGoogleDocs.nodes) {
      const profile = item.document.path.replace(/\/|about/g, "")
      const $ = cheerio.load(item.childMarkdownRemark.html)
      let image = ""
      const imageItems = $("img").toArray()
      if (imageItems[0]) {
        image = imageItems[0].attribs.src
      }
      const config = { image }
      $("p")
        .toArray()
        .forEach(e => {
          const [prop, content] = $(e).html().trim().split(":")
          if (!/span|class|style/g.test(prop)) {
            config[prop.toLowerCase()] = content.trim()
          }
        })
      profiles[profile] = config
    }
    graphql(
      `
        {
          allGoogleDocs {
            nodes {
              childMarkdownRemark {
                timeToRead
                html
              }
              document {
                path
                createdTime(formatString: "MMMM DD, YYYY", locale: "es-ES")
              }
            }
          }
        }
      `
    ).then(async result => {
      result.data.allGoogleDocs.nodes.forEach(context => {
        let path = context.document.path
        const [_, username, id] = context.document.path.split("/")
        if (id == "about") {
          path = `/blog/${username}`
          return actions.createPage({
            path,
            context: profiles[username],
            component: PATH.resolve(`./src/templates/post-profile.js`),
          })
        }
        path = `/blog${path}`
        actions.createPage({
          path,
          context,
          component: PATH.resolve(`./src/templates/post.js`),
        })
      })
    })
  })
}
