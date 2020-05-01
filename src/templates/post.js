import React from "react"
const Prism = require("prismjs")
const cheerio = require("cheerio")

export const template = `pageContext: {
  childMarkdownRemark {
    timeToRead
    html
  }
  document {
    path
    createdTime
  }
}`
export default ({ pageContext }) => {
  const $ = cheerio.load(pageContext.childMarkdownRemark.html, {
    decodeEntities: false,
  })
  $("a,h1,h2,h3,h4")
    .toArray()
    .forEach(e => {
      if (e.attribs.href) {
        let href = e.attribs.href.replace(/%5B/g, "[").replace(/%5D/g, "]")
        if (/\[.+\]\(.+\)/gu.test(href)) {
          href = href.replace(/\[.+\(|\)/gu, "")
        }
        $(e).attr("href", href)
      }
      if (!e.children.length) {
        $(e).remove()
      }
    })
  $("img")
    .toArray()
    .forEach(e => {
      $(e).removeAttr("alt")
      $(e).removeAttr("title")
    })

  $("pre code")
    .toArray()
    .forEach(e => {
      let code = $(e).html()
      if (/\[.+\]\(.+\)/g.test(code)) {
        code = code.replace(/\[.+\(|\)/g, "")
      }
      let language = e.attribs.class.replace("language-", "")
      if(language=="gif"){
        return $(e).parent("pre").replaceWith(
          `<img src="${code}"/>`
        )
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
        return $(e).parent("pre").replaceWith(
            `<iframe width="100%" height="460" src="${code}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
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

  return (
    <div className="px-8 w-ful flex justify-center max-h-screen overflow-x-hidden overflow-y-auto">
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: $.html(),
        }}
      />
    </div>
  )
}
