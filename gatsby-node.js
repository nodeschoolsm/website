const PATH = require(`path`)
const cheerio = require("cheerio")
const Prism = require("prismjs")
const fetch = require("node-fetch")
const sharp = require("sharp")
const MAX_IMAGE_WIDTH = 840
const TYPES_TO_SHARPEN = ["png", "jpg", "jpeg"]
const DEFAULT_USERNAME = "USUARIO"
//images with higher width are downed to 840px
const loadAllImages = async ($, { nodes = [], array = [] }) => {
  const images = $("img").toArray()
  for (i in images) {
    const img = images[i]
    const { src, alt, title } = img.attribs
    const insideQueryIndex = array.indexOf(src)
    const $item = $(img)
    if (i > 0) {
      $item.attr("data-zoomable", "")
      $item.attr("class", "border border-dark-05 rounded")
    }
    if (alt) {
      $item.removeAttr("alt")
      $item.append(`<span class="img-alt">${alt}</span>`)
    }
    if (title) {
      $item.removeAttr("title")
      $item.attr("style", title)
    }
    if (insideQueryIndex > -1) {
      $item.attr("src", nodes[insideQueryIndex].publicURL)
    } else if (src.includes("googleusercontent")) {
      await new Promise(done => {
        fetch(src)
          .then(response => {
            const type = response.headers.get("content-type")
            return new Promise(sendBuffer => {
              response.buffer().then(buffer => {
                if (TYPES_TO_SHARPEN.includes(type.replace("image/"))) {
                  const sharpedImage = sharp(buffer)
                  return sharpedImage
                    .metadata()
                    .then(({ width }) => {
                      if (width > MAX_IMAGE_WIDTH) {
                        return sharpedImage.resize({
                          width: MAX_IMAGE_WIDTH,
                        })
                      }
                      return sharpedImage
                    })
                    .then(sharpedImage => sharpedImage.toBuffer())
                    .then(buffer => sendBuffer({ buffer, type }))
                }
                sendBuffer({ buffer, type })
              })
            })
          })
          .then(({ buffer, type }) => {
            const base64 = buffer.toString("base64")
            done($item.attr("src", `data:${type};base64,${base64}`))
          })
          .catch(error => done(console.error({ error })))
      })
    }
  }
}
const getCleanMdURL = (str = "") => {
  if (/\[.+\]\(.+\)/gu.test(str)) {
    return str.replace(/\[.+\(|\)/gu, "")
  }
  return str
}
const embed = src => {
  return `<iframe width="100%" height="225" src="${src}" frameborder="0" allow="same-origin; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; scripts" allowfullscreen></iframe>`
}
exports.createPages = async ({ graphql, actions }) => {
  await graphql(
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
        imgURLS: allFile {
          nodes {
            publicURL
            relativePath
          }
        }
      }
    `
  ).then(async result => {
    let allPosts = []
    let profiles = {}
    let postsByUser = {}
    const tags = {}
    const { authors, entries, imgURLS } = result.data
    const allImages = {
      nodes: imgURLS.nodes,
      array: imgURLS.nodes.map(({ relativePath }) => relativePath),
    }
    for (item of authors.nodes) {
      //Getting all blog authors
      const profile = item.document.path.replace(/\/|about/g, "")
      const $ = cheerio.load(item.childMarkdownRemark.html, {
        decodeEntities: false,
      })
      await loadAllImages($, allImages)
      $("script,link").remove()
      let image = `/social.svg`
      const imageSrc = $("img").first().attr("src")
      if (imageSrc) {
        image = imageSrc
      }
      const frontmatter = { image, name: DEFAULT_USERNAME, bio: "NO BIO" }
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
              frontmatter[prop.toLowerCase().trim()] = content.join(":").trim()
            }
          }
        })
      profiles[profile] = frontmatter
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
          const item = $("pre code").first()
          if (item.text()) {
            const config = item.html().trim().split("\n")
            item.parent().remove()
            config.map(item => {
              const [head = "", content = ""] = item.split(":")
              const prop = head.trim().toLowerCase()
              const value = content.trim().toLowerCase()
              if (prop && content) {
                if (content.includes(",")) {
                  state[prop] = value.split(",").map(e => e.trim())
                } else {
                  state[prop] = value.trim()
                }
              }
            })
          }
          state.ready = state.ready.includes("true")
          return state
        })()
        if (frontmatter.ready) {
          await loadAllImages($, allImages)
          $("script,link").remove()
          frontmatter.tags.forEach(tag => {
            const prevAmount = tags[tag]
            tags[tag] = prevAmount ? prevAmount + 1 : 1
          })
          const encodeMe = t => t.replace(/ /g, "-").replace(/A-z0-0/g, "")
          $("a,h1,h2,h3,h4")
            .toArray()
            .forEach(e => {
              if (e.attribs.href) {
                const href = getCleanMdURL(
                  e.attribs.href.replace(/%5B/g, "[").replace(/%5D/g, "]")
                )
                $(e).attr("href", href)
              }
              const textIn = $(e).text()
              $(e).attr("id", encodeMe(textIn))
              if (!textIn) {
                $(e).remove()
              }
            })
          $("iframe")
            .toArray()
            .forEach(iframe => {
              $iframe = $(iframe)
              $iframe.replaceWith(embed($iframe.attr("src")))
            })
          $("pre code")
            .toArray()
            .forEach(e => {
              let code = getCleanMdURL($(e).text())
              let language =
                e.attribs &&
                e.attribs.class &&
                e.attribs.class.replace("language-", "")
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
                //removing any char escaping "\""
                return $(e).parent().replaceWith(embed(code))
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
                  .replace(/\\\*/g, "*")
                  .replace(/\/`/g, "`"),
                grammar,
                language
              )
              $(e).text(html)
            })
          $("body > code")
            .toArray()
            .forEach(code => {
              $code = $(code)
              $code.html($code.html({ decodeEntities: false }))
            })
          const $toc = cheerio.load(props.childMarkdownRemark.tableOfContents, {
            decodeEntities: false,
          })
          $toc("a")
            .toArray()
            .forEach((a, index) => {
              const isFirst = index == 0
              $toc(a).attr(
                "href",
                isFirst ? "#top" : "#" + encodeMe($toc(a).text())
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
            let text = node.text()
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

          //including frontmatter to context
          context.frontmatter = frontmatter
          const contextWithoutContent = (() => {
            const clone =  JSON.parse(JSON.stringify(context))
            //deep copy of context
            clone.frontmatter.content = null
            clone.frontmatter.toc = null
            return clone
          })()
          const prevPostsByUser = postsByUser[username]
          postsByUser[username] = prevPostsByUser
            ? [...prevPostsByUser, contextWithoutContent]
            : [contextWithoutContent]
          allPosts.push(context)
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
      const profile = profiles[username]
      if (profile.name != DEFAULT_USERNAME) {
        //At least username must be provided to create user page
        const path = `/blog/${username}`
        actions.createPage({
          path,
          context: { ...profile, posts: postsByUser[username], username },
          component: PATH.resolve(`./src/templates/post-profile.js`),
        })
      }
    })
  })
}
