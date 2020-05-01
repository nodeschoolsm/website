const PATH = require(`path`)

exports.createPages = async ({ graphql, actions }) =>
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
  ).then(result => {
    result.data.allGoogleDocs.nodes.forEach(context => {
      let path = context.document.path
      const [_, username, id] = context.document.path.split("/")
      if (id == "about") path = `/${username}`
      path = `/blog${path}`
      actions.createPage({
        path,
        context,
        component: PATH.resolve(`./src/templates/post.js`),
      })
    })
  })
