import React from "react"
const description = `Ser una comunidad que sirva como canal de conocimiento colectivo y gratuito de alta calidad`
export const title = `Nodeschool San Miguel 👨‍👩‍👧‍👦`
const image = `https://secure.meetupstatic.com/photos/event/c/6/a/2/highres_484010850.jpeg`
export const siteMetaData = {
  title,
  description,
  "og:title": title,
  "og:description": description,
  "og:image": image,
  "og:url": "https://nodeschoolsm.io",
  "twitter:title": title,
  "twitter:description": description,
  "twitter:image": image,
  "twitter:card": `Nuestra visión es posicionarnos local e internacionalmente como una comunidad apasionada por el desarrollo web y el aprendizaje colectivo.`
}
export default siteMetaData

export const getMetas = () => {
  return [
    ...Object.keys(siteMetaData).map(name => {
      return <meta name={name} content={siteMetaData[name]} />
    }),
    <link
      rel="shortcut icon"
      href={require("./assets/favicon.png")}
      type="image/png"
    />
  ]
}
