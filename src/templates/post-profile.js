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
import { Helmet } from "react-helmet"
import coverDefault from "../assets/image/cover.jpg"
import profileDefault from "../assets/image/social.svg"
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

export default (props) => {
  console.log(props)
  return (
    <div
      onScroll={e => {
        window.postCover.style.opacity =
          0.3 + e.currentTarget.scrollTop / window.innerHeight
      }}
      className="w-full max-h-screen overflow-x-hidden overflow-y-auto"
    >
      <Helmet>
        <base target="_blank" rel="noopener noreferrer" />
      </Helmet>
      <nav className="fixed top-0 left-0 z-20">
        <Burguer />
      </nav>
      awdawd
      <div className="bg-yellow h-4px z-10 sticky top-0 mt-6" />
      <Marquee>NODESCHOOL SAN MIGUEL,</Marquee>
      <Footer />
    </div>
  )
}
