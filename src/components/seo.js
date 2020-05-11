import React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
const TITLE = `Nodeschool San Miguel`
const DESCRIPTION = `Somos una comunidad en busca de conocimiento accesible para todas las personas.`
const IMAGE = `https://nodeschoolsm.io/SEO.jpg`
const URL = `https://nodeschoolsm.io`
export default ({
  title = TITLE,
  description = DESCRIPTION,
  image = IMAGE,
}) => {
  const { pathname } = useLocation()
  const url = `${URL}${pathname}`
  const metaTags = [
    {
      value: "author",
      content: title,
    },
    {
      value: "keywords",
      content: "frontend,website,blog,nodeschoolsm,coding,community,tech",
    },
    {
      value: "description",
      content: description,
    },
    {
      value: "og:title",
      type: "property",
      content: title,
    },
    {
      value: "og:description",
      type: "property",
      content: description,
    },
    {
      value: "og:image",
      type: "property",
      content: image,
    },
    {
      value: "og:type",
      type: "property",
      content: "website",
    },
    {
      value: "og:url",
      type: "property",
      content: url,
    },
    {
      value: "og:site_name",
      type: "property",
      content: title,
    },
    {
      value: "twitter:card",
      content: description,
    },
    {
      value: "twitter:title",
      content: title,
    },
    {
      value: "twitter:description",
      content: description,
    },
    {
      value: "twitter:image",
      content: image,
    },
    {
      value: "twitter:site",
      content: "@nodeschoolsm",
    },
    {
      value: "name",
      type: "itemprop",
      content: title,
    },
    {
      value: "description",
      type: "itemprop",
      content: description,
    },
    {
      value: "image",
      type: "itemprop",
      content: image,
    },
  ]
  return (
    <Helmet
      title={title}
      meta={metaTags.map(({ value = "", type = "name", content = "" }) => {
        return { [type]: value, content }
      })}
    />
  )
}
