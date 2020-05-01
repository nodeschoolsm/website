import React from "react"
import Footer from "../components/footer"
import Burguer from "../components/burguer"
import Marquee from "../components/marquee"
import { DiscussionEmbed } from "disqus-react"
import {
  InstagramOutlined,
  GithubOutlined,
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
} from "@ant-design/icons"
import Helmet from "react-helmet"
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
      let language = e.attribs?.class?.replace("language-", "")
      if (language == "gif") {
        return $(e).parent("pre").replaceWith(`<img src="${code}"/>`)
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
          .parent("pre")
          .replaceWith(
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
    <div
      onScroll={e => {
        window.postCover.style.opacity =
          0.22 + e.currentTarget.scrollTop / window.innerHeight
      }}
      className="w-full max-h-screen overflow-x-hidden overflow-y-auto"
    >
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
        />
      </Helmet>
      <nav className="fixed top-0 left-0 z-20">
        <Burguer />
      </nav>

      <div className="bg-white">
        <div
          className="w-full overflow-hidden flex items-end"
          style={{ height: "66vh", minHeight: "16rem" }}
        >
          <div className="absolute text-light-70 top-0 text-xs right-0 z-1 pr-4 pt-4">
            Febrero 3, 2020, <b>7min</b>
          </div>
          <div
            id="postCover"
            className="absolute inset-0 bg-black z-1 opacity-25"
          />
          <img
            className="w-full h-full object-cover"
            src="http://localhost:8000/static/7bd3fa5139c081adb38b63cf6805ffe1/6aca1/google-docs-image-eaeec629-8c45-5b68-9751-8a962d47cad2.jpg"
            alt=""
          />
        </div>

        <div className="p-8 lg:p-16 max-w-4xl mx-auto">
          <h1 className="uppercase lg:text-5xl m-0">LOCAL HACK DAY 2019</h1>
          <div className="flex flex-wrap mt-4">
            {[...Array(5)].map((_, i) => (
              <span className="px-2 rounded bg-dark-05 text-dark-45 py-1 text-xs  font-bold m-1">
                hack-day {i}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-yellow h-4px z-10 sticky top-0 mt-6" />
      <div
        className="post"
        dangerouslySetInnerHTML={{
          __html: $.html(),
        }}
      />
      <div
        style={{ background: "rgba(0,0,0,0.015" }}
        className="flex mt-24 border-b border-t border-dark-05"
      >
        <div
          className="flex-grow z-1 ml-32 font-bold absolute h-full overflow-hidden flex items-end"
          style={{ fontSize: "11rem", opacity: 0.015 }}
        >
          AUTOR
        </div>
        <div
          className="flex-grow font-bold absolute h-full overflow-hidden flex items-center"
          style={{
            fontSize: "17rem",
            opacity: 0.01,
            letterSpacing: "4rem",
            marginLeft: "30%",
          }}
        >
          AUTOR
        </div>
        <div
          className="flex-grow -ml-12 font-bold absolute h-full overflow-hidden flex"
          style={{ fontSize: "15rem", opacity: 0.011, letterSpacing: "2rem" }}
        >
          AUTOR
        </div>
        <div className="max-w-4xl mx-auto flex w-full px-8 lg:px-16 z-10">
          <div
            style={{ minWidth: "50%" }}
            className="flex-grow pr-8 mb-2 flex justify-center flex-col sm:items-end text-dark-70"
          >
            <div className="text-xl font-bold">Denny Portillo</div>
            <div className="flex space-x-1 mt-3 items-center">
              <InstagramOutlined />
              <GithubOutlined />
              <FacebookFilled />
              <TwitterOutlined />
              <LinkedinFilled />
              <div className="h-1px bg-dark-10 w-6" />
            </div>
          </div>
          <img
            className="object-cover shadow rounded -mt-8 mb-3 mt-16 h-40 h-40"
            src="http://localhost:8000/static/e0daa1e7ab311a5e473489ec76e2aa49/a6d36/google-docs-image-0b6deb4f-32b3-5309-9ff3-e096e17256e8.png"
            alt=""
          />
        </div>
      </div>

      <div className="px-8 lg:px-16 my-24 max-w-4xl mx-auto">
        <DiscussionEmbed
          shortname="nodeschoolsm"
          config={{
            url: "https://nodeschoolsm.io/blog/denny-portillo/local-hack-day",
            identifier: "denny-portillo/local-hack-day",
            title: "LOCAL HACK DAY 2019",
          }}
        />
      </div>
      <Marquee>NODESCHOOL SAN MIGUEL,</Marquee>
      <Footer />
    </div>
  )
}
