import React, { useState } from "react"
import Footer from "../components/footer"
import Marquee from "../components/marquee"
import Nav from "../components/nav"
import RequestBlogAcces from "../components/requestBlogAcces"
import { Helmet } from "react-helmet"
import { CommentCount } from "disqus-react"
import { AlertOutlined, ControlOutlined } from "@ant-design/icons"
import Seo from "../components/seo"
const items = {
  tag:
    "px-2 select-none hover:shadow-lg text-dark-80 hover:text-dark-95 flex items-center cursor-pointer rounded bg-dark-10 py-1 text-xs font-bold",
}
const SORT_TYPES = {
  UP: "UP",
  DOWN: "DOWN",
}
export default ({ pageContext = {} }) => {
  const { tags = {}, users = [], posts = [] } = pageContext
  const [userTags, setTags] = useState(tags)
  const [userProfiles, setProfiles] = useState(users)
  const [sortBy, setSorting] = useState(SORT_TYPES.DOWN)
  const TAGKEYS = Object.keys(tags)
  const USER_TAGKEYS = Object.keys(userTags)
  const handleTags = ({ userTags, setTags, tags, text, amActive }) => {
    const clone = { ...userTags }
    if (amActive) {
      delete clone[text]
    } else {
      clone[text] = tags[text]
    }
    setTags(clone)
  }
  const userPosts = posts
    .filter(({ username, frontmatter: { tags = [] } }) => {
      if (userProfiles.includes(username)) {
        if (
          new RegExp(USER_TAGKEYS.join("|"), "gi").test(JSON.stringify(tags))
        ) {
          return true
        }
      }
      return false
    })
    .sort((a, b) => {
      ;[a, b] = sortBy == SORT_TYPES.UP ? [b, a] : [a, b]
      return b.frontmatter.datesSum - a.frontmatter.datesSum
    })

  return (
    <div className="w-full max-h-screen bg-white overflow-x-hidden overflow-y-auto bg-dark-10">
      <Helmet>
        <base target="_blank" rel="noopener noreferrer" />
      </Helmet>
      <Seo
        title="NodeschoolSM Blog"
        image="https://nodeschoolsm.io/SEO_BLOG.jpg"
      />
      <section className="w-full bg-white">
        <Nav />
        <div className="mx-auto max-w-5xl px-6 font-bold mb-2 mt-8 flex items-center space-x-1">
          <ControlOutlined />
          <div>FILTROS</div>
        </div>
        <div className="mx-auto max-w-5xl my-2">
          <div className="px-6 py-2 text-xs flex flex-wrap space-x-2 space-y-2 items-center">
            <b>Tags:</b>
            {TAGKEYS.map(text => {
              const amActive = USER_TAGKEYS.indexOf(text) != -1
              return (
                <span
                  onClick={() =>
                    handleTags({
                      text,
                      tags,
                      userTags,
                      text,
                      amActive,
                      setTags,
                    })
                  }
                  style={{ opacity: amActive ? 1 : 0.4 }}
                  className={items.tag}
                >
                  {text}
                  <div className="bg-dark-90 ml-1 text-white h-4 w-4 rounded-full flex items-center justify-center">
                    {tags[text]}
                  </div>
                </span>
              )
            })}
            <span onClick={() => setTags({ ...tags })} className={items.tag}>
              Todas
            </span>
            <span onClick={() => setTags({})} className={items.tag}>
              Ninguna
            </span>
          </div>
          <div className="px-6 py-1 text-xs flex flex-wrap space-x-2 space-y-2 items-center">
            <b>Autores:</b>
            {users.map(user => {
              const amActive = userProfiles.indexOf(user) != -1
              return (
                <span
                  onClick={() => {
                    if (amActive) {
                      setProfiles(profiles => {
                        return profiles.filter(e => e != user)
                      })
                    } else {
                      setProfiles(profiles => {
                        return [...profiles, user]
                      })
                    }
                  }}
                  style={{ opacity: amActive ? 1 : 0.4 }}
                  className={items.tag}
                >
                  {user}
                </span>
              )
            })}
            <span onClick={() => setProfiles([...users])} className={items.tag}>
              Todos
            </span>
            <span onClick={() => setProfiles([])} className={items.tag}>
              Ninguno
            </span>
          </div>
          <div className="px-6 py-2 text-xs flex flex-wrap space-x-2 space-y-2 items-center">
            <b>Ordenar por:</b>
            <span
              style={{ opacity: sortBy == SORT_TYPES.UP && 0.4 }}
              onClick={() => setSorting(SORT_TYPES.DOWN)}
              className={items.tag}
            >
              Más recientes primero
            </span>
            <span
              style={{ opacity: sortBy == SORT_TYPES.DOWN && 0.4 }}
              onClick={() => setSorting(SORT_TYPES.UP)}
              className={items.tag}
            >
              Últimas entradas primero
            </span>
          </div>
        </div>
        <div
          className="flex mt-8 border-t border-dark-10 flex-wrap mx-auto max-w-6xl border-l"
          style={{ minHeight: "22rem" }}
        >
          {userPosts.length ? (
            userPosts.map(({ frontmatter = {}, profile = {} }) => {
              const {
                description,
                path = "",
                title,
                timeToRead = 0,
                tags = [],
                createdTime = "2020",
                cover,
              } = frontmatter
              const url = `https://nodeschoolsm.io${path}`
              return (
                <a
                  key={path}
                  href={path}
                  title={`Continuar leyendo: ${title}`}
                  className="border-b blog-entry hover:shadow-inner border-r block w-full lg:w-1/2 flex flex-col border-dark-10 p-6 border-b-0 hover:border-dark-10 hover:text-dark-90"
                >
                  <div
                    className="w-full"
                    style={{
                      height: "calc(15rem + 10vh)",
                    }}
                  >
                    <img
                      className="w-full h-full object-cover cover"
                      src={cover}
                      alt={`Cover de ${title}`}
                    />
                  </div>
                  <div className="text-base font-bold mt-6 text-2xl">
                    {title}
                  </div>

                  <div className="text-sm mt-4 text-dark-80 flex-grow">
                    {description}
                  </div>
                  <div className="w-full h-10 pb-1 text-dark-80 flex text-xs items-center space-x-2 overflow-y-hidden overflow-x-auto">
                    <div className="flex whitespace-no-wrap">
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
                    {tags.length
                      ? [
                          <div>/</div>,
                          <div className="mx-2 whitespace-no-wrap">
                            {tags.join(" • ")}
                          </div>,
                        ]
                      : null}
                  </div>
                  <div className="w-full flex mt-6 border-l-4 border-yellow pl-3">
                    <img
                      src={profile.image}
                      alt="profile-pic"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="pl-2 pt-2">
                      <b className="text-sm block" style={{ color: "#2d7ff9" }}>
                        {profile.name}
                      </b>
                      <div className="text-xs text-dark-65">
                        {createdTime} • {timeToRead}Min.
                      </div>
                    </div>
                  </div>
                </a>
              )
            })
          ) : (
            <div className="flex items-center justify-center flex-grow">
              <AlertOutlined className="text-2xl" />
              <div className="text-xs ml-1">No se encontraron resultados</div>
            </div>
          )}
        </div>
      </section>
      <RequestBlogAcces />
      <Marquee />
      <Footer />
    </div>
  )
}
