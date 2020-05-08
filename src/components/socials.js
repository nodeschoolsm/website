import React from "react"
import {
  InstagramOutlined,
  GithubOutlined,
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  GlobalOutlined,
  MailOutlined,
} from "@ant-design/icons"
export default ({ pageContext = {} }) => {
  const {
    instagram = false,
    twitter = false,
    facebook = false,
    github = false,
    linkedin = false,
    website = false,
    email = false,
  } = pageContext
  return [
    [instagram, InstagramOutlined, "https://instagram.com/"],
    [twitter, TwitterOutlined, "https://twitter.com/"],
    [facebook, FacebookFilled, "https://facebook.com/"],
    [github, GithubOutlined, "https://github.com/"],
    [website, null, "website"],
    [linkedin, LinkedinFilled, "https://linkedin.com/in/"],
    [email, MailOutlined, "mailto:", "Enviar email"],
  ].map(([profile, Item, base = "", title = false]) => {
    if (profile) {
      if (base == "website") {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={profile.includes("http") ? profile : `https://${profile}`}
            title={title || "Ir al sitio web"}
          >
            <GlobalOutlined />
          </a>
        )
      }
      let href = `${base}${profile[0].replace("@", "") + profile.substr(1)}`
      if (profile.includes("http")) {
        href = profile
      }
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          title={title || "Seguir"}
        >
          <Item />
        </a>
      )
    }
    return null
  })
}
