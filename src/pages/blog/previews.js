import React, { useState } from "react"
import Footer from "../../components/footer"
const showdown = require("showdown")
const converter = new showdown.Converter()
const defaultCover = require("../../assets/image/cover.jpg")
const cheerio = require("cheerio")
const Prism = require("prismjs")
const initState = {
  content: "",
  title: "Sín titulo",
  cover: defaultCover,
  tags: [],
}
export default () => {
  const [frontmatter, setFrontmatter] = useState(initState)
  const handleHTML = rawHTML => {
    const $ = cheerio.load(rawHTML, {
      decodeEntities: false,
    })
    const title = (() => {
      const item = $("h1").first()
      let title = frontmatter.title
      if (item) {
        title = item.text()
        item.remove()
      }
      return title
    })()
    const cover = (() => {
      const item = $("img").first()
      let cover = frontmatter.cover
      if (item) {
        cover = item.attr("src")
        item.remove()
      }
      return cover
    })()
    const tags = ["no-code"]
    $("span")
      .toArray()
      .forEach(elem => {
        const item = $(elem)
        item.replaceWith(item.html())
      })
    $("li p")
      .toArray()
      .forEach(elem => {
        const item = $(elem)
        item.replaceWith(item.html())
      })
    $("*[style]")
      .toArray()
      .forEach(item => {
        $(item).removeAttr("style")
      })

    $("style,script").remove()
    const html = $.html()
    if (html) {
      const markdown = converter.makeMarkdown(html)
      let cleanedHTML = converter.makeHtml(markdown.replace(/\\>/g, ">"))
      const codeTags = cleanedHTML.match(/(<p>```)(.|\n)*?(```<\/p>)/g)
      if (codeTags) {
        const firstCodeTag = codeTags.shift()
        let docFrontMatter = firstCodeTag
          .replace(/<p>|<\/p>/g, "")
          .toLowerCase()
        docFrontMatter = docFrontMatter.split("\n").find(t => {
          return t.includes("tags")
        })
        if (docFrontMatter) {
          docFrontMatter
            .replace("tags:", "")
            .trim()
            .split(",")
            .forEach(tag => {
              tags.push(tag)
            })
        }
        cleanedHTML = cleanedHTML.replace(firstCodeTag, "")

        codeTags.forEach(tag => {
          const markdownCode = tag.replace(/<p>|<\/p>/g, "")
          const code = markdownCode.split("\n")
          const userLanguage = code[0].replace("```", "")
          code.pop()
          code.shift()
          if (["video", "iframe", "gif"].includes(userLanguage)) {
            if (userLanguage == "gif") {
              cleanedHTML = cleanedHTML.replace(tag, `<img src="${code}"/>`)
            }
            let posibleURL = code.join("")
            if (/\[.+\]\(.+\)/g.test(posibleURL)) {
              posibleURL = posibleURL.replace(/\[.+\(|\)/g, "")
            }
            if (posibleURL.includes("<a")) {
              posibleURL = posibleURL.replace(/(.+href=")|(">.+)/g, "")
            }
            const getLastUrlPiece = URL =>
              URL.split("/").splice(-1, 1)[0].replace(/\\/g, "")
            if (code.includes("youtube")) {
              posibleURL = `https://www.youtube-nocookie.com/embed/${getLastUrlPiece(
                posibleURL
              ).replace("watch?v=", "")}`
            }
            if (code.includes("vimeo")) {
              posibleURL = `https://player.vimeo.com/video/${getLastUrlPiece(
                posibleURL
              )}?autoplay=0&title=0&byline=0&portrait=0`
            }
            posibleURL = posibleURL.replace(/\\/g, "")
            cleanedHTML = cleanedHTML.replace(
              tag,
              `<iframe width="100%" height="460" src="${posibleURL}" frameborder="0" allow="same-origin; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; scripts" allowfullscreen></iframe>`
            )
          } else {
            let language = "markup"
            if (Prism.languages[userLanguage]) {
              language = userLanguage
            }

            const htmlCode = Prism.highlight(
              code.join("\n"),
              Prism.languages[language],
              language
            )
            cleanedHTML = cleanedHTML.replace(
              tag,
              `<pre><code>${htmlCode}</code></pre>`
            )
          }
        })
      }
      setFrontmatter(prev => ({
        ...prev,
        content: cleanedHTML,
        title,
        cover,
        tags,
      }))
    }
  }
  return (
    <div className="w-full max-h-screen overflow-auto">
      <style>{`.post div{width: 100%} table{margin-left: auto; margin-right: auto}`}</style>
      <div
        hidden={!frontmatter.content}
        onClick={() => setFrontmatter(initState)}
        className="fixed z-1 cursor-pointer text-sm hover:shadow-inner top-0 left-0 bg-yellow font-bold border-dark-10 border-2 px-6 py-4"
      >
        Cancelar preview
      </div>
      <div
        className="max-w-3xl mx-auto px-6 min-h-screen py-6"
        hidden={frontmatter.content}
      >
        <h1>
          👋 Hola querido saltamontes.
          <br />
          Esta pantalla sirve para hacer previews de las entradas del blog
        </h1>
        <p>
          Si quieres visualizar cómo se verá tu entrada/post en el blog de la
          comunidad copia y pega todo el texto en el documento de Google Docs
          donde tienes tu borrador{" "}
          <i>
            (Puedes presionar <b>CTRL + A</b> Para seleccionar todo)
          </i>{" "}
          y luego pegalo en la caja que está debajo.
        </p>
        <pre
          id="pre"
          className="border-2 w-full h-48 p-2 mt-8"
          contentEditable="true"
          onPaste={() =>
            setTimeout(() => {
              handleHTML(window.pre.innerHTML)
              window.pre.innerHTML = ""
            }, 400)
          }
        />
      </div>
      <div hidden={!frontmatter.content}>
        <img
          src={frontmatter.cover}
          alt="cover"
          style={{ height: "66vh", minHeight: "16rem" }}
          className="w-full object-cover"
        />
        <div className="px-6 py-8 lg:p-16 max-w-6xl mx-auto">
          <h1 className="uppercase lg:text-5xl m-0 font-sans">{frontmatter.title}</h1>
          <div className="flex flex-wrap mt-4 space-x-2">
            <b>TAGS:</b>
            {frontmatter.tags.map(text => (
              <span className="bg-dark-05 p-1 text-sm font-sans">{text}</span>
            ))}
          </div>
        </div>
        <div className="bg-dark-20 h-1px mt-6" />
      </div>
      <div
        className="post"
        dangerouslySetInnerHTML={{ __html: frontmatter.content }}
      />
      <div className="bg-dark-05 w-full px-6 py-24">
        <div className="max-w-3xl mx-auto flex items-center text-sm sm:text-base">
          <img
            className="h-32 pr-2"
            src={require("../../assets/image/alien.svg")}
            alt="A"
          />
          <div>
            Si aún no sabes todos los componentes que puedes agregar en tu post,
            visita{" "}
            <a href="/blog/denny-portillo/guide">
              <b>esta guía</b>
            </a>{" "}
            donde se explica cada uno estos incluyendo ejemplos y buenas
            prácticas.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
