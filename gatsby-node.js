const PATH = require(`path`)
const cheerio = require("cheerio")
const Prism = require("prismjs")

exports.createPages = async ({ graphql, actions }) => {
  graphql(
    `
      {
        authors: allGoogleDocs(
          filter: { document: { path: { regex: "/about/" } } }
        ) {
          nodes {
            childMarkdownRemark {
              html
            }
            document {
              path
            }
          }
        }
        entries: allGoogleDocs {
          nodes {
            childMarkdownRemark {
              timeToRead
              tableOfContents(absolute: false)
              html
            }
            document {
              path
              createdTime(formatString: "MMMM DD, YYYY", locale: "es-ES")
              datesSum: createdTime(
                formatString: "YYYY+(MM*31)+DD+(hh/24)+(mm*.04166)"
              )
            }
          }
        }
        airtable: allAirtable {
          group(field: data___email_speaker) {
            nodes {
              data {
                name_speaker
                social
                slides {
                  url
                }
                diploma {
                  url
                }
                bio_speaker
                email_speaker
                event_name
                name
              }
            }
          }
        }
      }
    `
  ).then(async result => {
    let allPosts = []
    let profiles = {}
    const tags = {}
    const { authors = [], entries = [] } = result.data
    for (item of authors.nodes) {
      //Getting all blog authors
      const profile = item.document.path.replace(/\/|about/g, "")
      const $ = cheerio.load(item.childMarkdownRemark.html)
      let image = `/social.svg`
      const imageItems = $("img").toArray()
      if (imageItems[0]) {
        image = imageItems[0].attribs.src
      }
      const config = { image }
      $("a")
        .toArray()
        .forEach(e => {
          $(e).replaceWith($(e).text().trim())
        })
      $("p")
        .toArray()
        .forEach(e => {
          const [prop, ...content] = $(e).html().trim().split(":")
          if (prop && content) {
            if (!/span|class|style/g.test(prop)) {
              config[prop.toLowerCase().trim()] = content.join(":").trim()
            }
          }
        })

      profiles[profile] = config
    }
    for (props of entries.nodes) {
      //Mapping up all entries on Google Docs
      const $ = cheerio.load(props.childMarkdownRemark.html, {
        decodeEntities: false,
      })
      let path = props.document.path
      const [_, username, id] = props.document.path.split("/")
      if (id !== "about") {
        path = `/blog${path}`
        const context = {
          username,
          profile: profiles[username],
          frontmatter: {},
        }
        const frontmatter = (() => {
          let state = { tags: ["no-tags"], ready: "false" }
          $("pre code")
            .toArray()
            .filter(e => {
              return !e.attribs.class
            })
            .map(e => {
              const config = $(e).html().trim().split("\n")
              $(e).parent().remove()
              return config.map(item => {
                const [head = "", content = ""] = item.split(":")
                const prop = head.trim().toLowerCase()
                if (prop && content) {
                  if (content.includes(",")) {
                    state[prop] = content.split(",").map(e => e.trim())
                  } else {
                    state[prop] = content.trim()
                  }
                }
              })
            })
          state.ready = state.ready.includes("true")
          return state
        })()
        if (frontmatter.ready) {
          frontmatter.tags.forEach(tag => {
            const prevAmount = tags[tag]
            tags[tag] = prevAmount ? prevAmount + 1 : 1
          })
          $("pre code")
            .toArray()
            .forEach(e => {
              let code = $(e).html()
              if (/\[.+\]\(.+\)/g.test(code)) {
                code = code.replace(/\[.+\(|\)/g, "")
              }
              let language =
                e.attribs && e.attribs.class.replace("language-", "")
              if (language == "gif") {
                return $(e).parent().replaceWith(`<img src="${code}"/>`)
              }
              if (["video", "iframe"].includes(language)) {
                const getLastUrlPiece = code =>
                  code.split("/").splice(-1, 1)[0].replace(/\\/g, "")
                if (code.includes("youtube")) {
                  code = `https://www.youtube-nocookie.com/embed/${getLastUrlPiece(
                    code
                  ).replace("watch?v=", "")}`
                }
                if (code.includes("vimeo")) {
                  code = `https://player.vimeo.com/video/${getLastUrlPiece(
                    code
                  )}?autoplay=0&title=0&byline=0&portrait=0`
                }
                code = code.replace(/\\/g, "")
                return $(e)
                  .parent()
                  .replaceWith(
                    `<iframe width="100%" height="460" src="${code}" frameborder="0" allow="same-origin; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; scripts" allowfullscreen></iframe>`
                  )
              }
              let grammar = Prism.languages.markup
              if (language in Prism.languages) {
                grammar = Prism.languages[language]
              } else {
                language = "markup"
              }
              const T = "__LINE__"
              const html = Prism.highlight(
                code
                  .replace(/\n{8,}/g, T.repeat(3))
                  .replace(/\n{5,}/g, T.repeat(2))
                  .replace(/\n{2,}/g, T)
                  .replace(new RegExp(T, "g"), "\n")
                  .replace(/\\\*/g, "*"),
                grammar,
                language
              )
              $(e).html(html)
            })
          $("img")
            .toArray()
            .forEach(e => {
              $(e).removeAttr("alt")
              $(e).removeAttr("title")
            })
          $("a,h1,h2,h3,h4")
            .toArray()
            .forEach(e => {
              if (e.attribs.href) {
                let href = e.attribs.href
                  .replace(/%5B/g, "[")
                  .replace(/%5D/g, "]")
                if (/\[.+\]\(.+\)/gu.test(href)) {
                  href = href.replace(/\[.+\(|\)/gu, "")
                }
                $(e).attr("href", href)
              }
              const textIn = $(e).text()
              $(e).attr("id", textIn.replace(/ /g, "-").replace(/A-z0-0/g, ""))
              if (!textIn) {
                $(e).remove()
              }
            })
          const $toc = cheerio.load(props.childMarkdownRemark.tableOfContents)
          $toc("a")
            .toArray()
            .forEach((a, index) => {
              const isFirst = index == 0
              $toc(a).attr(
                "href",
                isFirst
                  ? "#top"
                  : "#" +
                      $toc(a)
                        .text()
                        .replace(/ /g, "-")
                        .replace(/A-z0-0/g, "")
              )
            })

          frontmatter.timeToRead = props.childMarkdownRemark.timeToRead
          const _createdTime = props.document.createdTime
          frontmatter.createdTime =
            _createdTime[0].toUpperCase() + _createdTime.substr(1)
          frontmatter.toc = (() => {
            if ($toc("a").first().text()) {
              return $toc.html()
            }
            return ""
          })()

          frontmatter.title = (() => {
            const node = $("h1").first()
            let text = node.html()
            if (text) {
              node.remove()
              return text
            }
            return "Sín titulo"
          })()
          frontmatter.cover = (() => {
            const node = $("img").first()
            if (node.attr("src")) {
              const URL = node.attr("src")
              node.closest("p").remove()
              return URL
            }
            return PATH.resolve(`/cover.jpg`)
          })()
          frontmatter.description = (() => {
            const firstP = $("p").first().text()
            return firstP ? firstP : "Sín descripción"
          })()
          frontmatter.content = $.html()
          frontmatter.path = path
          frontmatter.datesSum = eval(props.document.datesSum)
          context.frontmatter = frontmatter
          allPosts.push(context)
          const previusUserPosts = profiles[username].posts
          profiles[username] = {
            ...profiles[username],
            posts: previusUserPosts
              ? [...previusUserPosts, context]
              : [context],
          }
          actions.createPage({
            path,
            context,
            component: PATH.resolve(`./src/templates/post.js`),
          })
        }
      }
    }
    const PROFILES_KEYS = Object.keys(profiles)
    actions.createPage({
      path: "/blog",
      context: { posts: allPosts, tags, users: PROFILES_KEYS },
      component: PATH.resolve(`./src/templates/blog.js`),
    })

    PROFILES_KEYS.map(username => {
      const path = `/blog/${username}`
      actions.createPage({
        path,
        context: profiles[username],
        component: PATH.resolve(`./src/templates/post-profile.js`),
      })
    })
  })
}
