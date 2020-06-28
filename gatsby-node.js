const PATH = require(`path`)
const cheerio = require("cheerio")
const Prism = require("prismjs")
const fetch = require("node-fetch")
const sharp = require("sharp")
const pako = require("pako")
const MAX_IMAGE_WIDTH = 864
const TYPES_TO_SHARPEN = ["png", "jpg", "jpeg"]
const DEFAULT_USERNAME = "USUARIO"
//! images with higher width are resized down to 864px
const loadAllImages = async ($, { nodes = [], array = [] }) => {
  const images = $("img").toArray()
  for (i in images) {
    const img = images[i]
    const { src, alt, title } = img.attribs
    const insideQueryIndex = array.indexOf(src)
    const $item = $(img)
    if (i > 0) {
      $item.attr("data-zoomable", "")
      $item.attr("loading", "lazy")
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
                if (TYPES_TO_SHARPEN.includes(type.replace("image/", ""))) {
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
                    .then(sharpedImage =>
                      sharpedImage
                        .flatten({ background: { r: 255, g: 255, b: 255 } })
                        .jpeg({
                          quality: 75,
                          force: true,
                          progressive: true,
                        })
                    )
                    .then(sharpedImage => sharpedImage.toBuffer())
                    .then(buffer => sendBuffer({ buffer, type: "jpeg" }))
                }
                sendBuffer({ buffer, type })
              })
            })
          })
          .then(({ buffer, type }) => {
            const content = buffer.toString("base64")
            $item.attr("new-src", JSON.stringify({ content, type }))
            done($item.attr("src", "/loader.gif"))
          })
          .catch(error => done(console.error({ error })))
      })
    }
  }
}
const getCleanMdURL = (str = "") => {
  //If (markdownLike)[link] clean it to [link] only
  if (/\[.+\]\(.+\)/gu.test(str)) {
    return str.replace(/\[.+\(|\)/gu, "")
  }
  return str
}
const getTocURL = t => t.replace(/ /g, "-").replace(/[^A-z0-9-_]/g, "")
const embed = src => {
  return `<iframe loading="lazy" width="100%" height="225" src="${src}" frameborder="0" allow="same-origin; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; scripts" allowfullscreen></iframe>`
}
const sanitize = $ => {
  $("script, link, style, meta").remove()
  return $
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
      //Getting all in blog authors
      const profile = item.document.path.replace(/\/|about/g, "")
      const $ = cheerio.load(item.childMarkdownRemark.html)
      await loadAllImages($, allImages)
      //Cleaning any in bio URL and replacing with text only
      $("a").each((_, a) => $(a).replaceWith(a.attribs.href))
      let image = `/social.svg`
      const imageSrc = $("img").attr("src")
      if (imageSrc) {
        image = imageSrc
      }
      const frontmatter = { image, name: DEFAULT_USERNAME, bio: "NO BIO" }
      sanitize($)
      $("p").each((_, e) => {
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
      const $ = cheerio.load(props.childMarkdownRemark.html)
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
          //Getting initial frontmatter
          let state = { tags: ["no-tags"], ready: "false" }
          const $tag = $("pre code").first()
          if ($tag.text()) {
            const config = $tag.text().trim().split("\n")
            config.map(item => {
              const [head = "", content = ""] = item.split(":")
              const prop = head.trim().toLowerCase()
              const value = content.trim().toLowerCase()
              if (prop && content) {
                if (content.includes(",")) {
                  state[prop] = value.split(",").map(e => e.trim())
                } else state[prop] = value.trim()
              }
            })
            $tag.parent().remove()
          }
          state.ready = /true/.test(state.ready)
          return state
        })()
        if (frontmatter.ready) {
          //Append blog post only if ready
          await loadAllImages($, allImages)
          frontmatter.tags.forEach(tag => {
            const prevAmount = tags[tag]
            tags[tag] = prevAmount ? prevAmount + 1 : 1
          })
          $("a").each((_, a) => {
            //cleaning linking inside href,a things
            $a = $(a)
            $a.attr("href", getCleanMdURL($a.attr("href")))
          })
          $("h1,h2,h3,h4").each((_, e) => {
            const $e = $(e)
            const textIn = $e.text()
            if (!textIn) {
              $e.remove()
            } else $e.attr("id", getTocURL(textIn))
          })
          $("iframe").each((_, iframe) => {
            //We don't want pals to mess around with custom iframes
            $iframe = $(iframe)
            $iframe.replaceWith(embed($iframe.attr("src")))
          })
          $("pre code").each((_, e) => {
            //Custom blocks
            let code = getCleanMdURL($(e).text())
            let language =
              e.attribs &&
              e.attribs.class &&
              e.attribs.class.replace("language-", "")
            if (language == "embed") {
              const getLastUrlPiece = str => str.split("/").splice(-1, 1)[0]
              if (/youtube/.test(code)) {
                code = `https://www.youtube-nocookie.com/embed/${getLastUrlPiece(
                  code
                ).replace("watch?v=", "")}`
              }
              if (/vimeo/.test(code)) {
                code = `https://player.vimeo.com/video/${getLastUrlPiece(
                  code
                )}?autoplay=0&title=0&byline=0&portrait=0`
              }
              //removing any char escaping "\""
              code = code.replace(/\\/g, "")
              return $(e).parent().replaceWith(embed(code))
            }
            //now we are handling real piece of code
            let grammar = Prism.languages.markup
            if (language in Prism.languages) {
              grammar = Prism.languages[language]
            } else language = "markup"
            const T = "___LINE___" /* Naming void(" ") */
            const highlightedCode = Prism.highlight(
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
            $(e).html(highlightedCode)
          })
          /*
           * Most of ontent is inside a Self invoking function to make
           * block like separation for frontmatter props
           */
          frontmatter.timeToRead = props.childMarkdownRemark.timeToRead
          frontmatter.createdTime = (() => {
            const createdAt = props.document.createdTime
            return createdAt[0].toUpperCase() + createdAt.substr(1)
          })()
          frontmatter.toc = (() => {
            //Table of content url cleaning
            const $ = cheerio.load(props.childMarkdownRemark.tableOfContents)
            let containsAtLeastOne = 0
            $("a").each((index, a) => {
              const $a = $(a)
              ++containsAtLeastOne
              const isFirst = index == 0
              $a.attr("href", isFirst ? "#top" : "#" + getTocURL($a.text()))
            })
            return containsAtLeastOne ? $.html() : ""
          })()
          frontmatter.title = (() => {
            const text = $("h1").first().text()
            if (text) {
              $("h1").first().remove()
              return text
            }
            return "Sín titulo"
          })()
          frontmatter.cover = (() => {
            const src = $("img").first().attr("src")
            if (src) {
              $("img").first().closest("p").remove()
              return src
            }
            return PATH.resolve(`/cover.jpg`)
          })()
          frontmatter.description = (() => {
            const firstParagraph = $("p").first().text()
            return firstParagraph ? firstParagraph : "Sín descripción"
          })()
          frontmatter.path = path
          frontmatter.datesSum = eval(props.document.datesSum)
          //including frontmatter to context
          context.frontmatter = frontmatter
          const contextWithoutContent = JSON.parse(JSON.stringify(context)) //deep cloning context
          context.frontmatter.content = pako.deflate(
            sanitize($)
              .html()
              .replace(/%5C_|\\_/gu, "_"),
            { to: "string" }
          ) // GDocs escapes \ on URL's, so lets replace em
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
          actions.removePageData({ id: path })
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
