import React from "react"
import Footer from "../components/footer"
import Marquee from "../components/marquee"
import RequestBlogAcces from "../components/requestBlogAcces"
import { Helmet } from "react-helmet"
import Socials from "../components/socials"
import Nav from "../components/nav"
import { CommentCount } from "disqus-react"
import { CommentOutlined, FormOutlined } from "@ant-design/icons"
import Seo from "../components/seo"
export default ({ pageContext = {} }) => {
  const { bio = "", image, name = "NOMBRE", posts = [] } = pageContext
  const totalPosts = posts.length
  return (
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto bg-white">
      <Helmet>
        <base target="_blank" rel="noopener noreferrer" />
      </Helmet>
      <Seo image={image} description={bio} title={`Autores | ${name}`} />
      <Nav />
      <div className="max-w-3xl mx-auto">
        <div className="mt-24 mx-4 lg:mx-16 text-center">
          <img
            src={image}
            alt="profile-image"
            style={{ minWidth: "8rem" }}
            className="w-32 h-32 object-cover mx-auto rounded shadow"
          />
          <b className="text-2xl sm:text-3xl block pt-8">{name}</b>
          <div className="text-dark-75 mt-4">{bio}</div>
          <div className="flex space-x-2 mt-2 justify-center">
            <Socials pageContext={pageContext} />
          </div>
        </div>
        <div hidden={totalPosts <= 0} className="mt-24 text-dark-80">
          <div className="uppercase py-4 px-6 text-xl border-dark-10 border-t border-b font-bold flex items-center justify-end space-x-2">
            <div>MIS ENTRADAS</div>
            <FormOutlined />
          </div>
          {posts.map(({ frontmatter = {} }) => {
            const {
              description,
              path = "",
              title,
              timeToRead = 0,
              tags = [],
            } = frontmatter
            const url = `https://nodeschoolsm.io${path}`
            return (
              <a
                key={path}
                href={path}
                title="Continuar leyendo"
                className="border-b block border-dark-10 p-6 border-b-0 hover:border-dark-10 hover:text-dark-90"
              >
                <div>
                  <div className="text-xl font-bold">{title}</div>
                  <div className="text-sm mt-2 text-dark-65">{description}</div>
                </div>
                <div className="w-full flex text-xs items-center justify-end pt-2 space-x-2">
                  <div>{timeToRead}min</div>
                  <div>/</div>
                  {tags.length
                    ? [
                        <div className="mx-2">{tags.join(", ")}</div>,
                        <div>/</div>,
                      ]
                    : null}
                  <CommentOutlined />
                  <div className="ml-2 hidden sm:block">
                    <CommentCount
                      shortname="nodeschoolsm"
                      config={{
                        url,
                        identifier: path,
                        title,
                      }}
                    >
                      0 Respuestas
                    </CommentCount>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
      <div className="my-8" />
      <RequestBlogAcces />
      <Marquee>NODESCHOOL SAN MIGUEL,</Marquee>
      <Footer />
    </div>
  )
}
