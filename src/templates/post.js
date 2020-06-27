import React from "react"
import Footer from "../components/footer"
import Burguer from "../components/burguer"
import Marquee from "../components/marquee"
import Seo from "../components/seo"
import { ReadOutlined } from "@ant-design/icons"
import { DiscussionEmbed } from "disqus-react"
import Socials from "../components/socials"
const VOIDED = `<html><head></head><body></body></html>`
const getVoidContentTemplate = username => `
<h1>ENTRADA VACÍA</h1>
<p>
  El autor esta entrada no ha agregado contenido aún :(<br/>
  Mientras esperas peudes ver las demás entradas del autor <a href="/blog/${username}">acá.</a>
</p>
<img src="/paper-plane.svg" alt="empty" class="w-full pt-32 opacity-50 lg:pr-16" style="max-width: 12rem"/>
`
export default ({ pageContext = {}, path }) => {
  const { profile = {}, frontmatter = {}, username = "" } = pageContext
  const {
    title,
    tags = [],
    timeToRead,
    cover,
    content,
    createdTime,
    description,
    toc,
  } = frontmatter
  const contentToRender =
    content == VOIDED ? getVoidContentTemplate(username) : content
  return (
    <div
      onScroll={e => {
        const scrollAmount = e.currentTarget.scrollTop
        window.postCover.style.opacity =
          0.15 + scrollAmount / window.innerHeight
        const itemTop = window.author.offsetTop
        const startHeight = window.innerHeight
        const result = ((scrollAmount + startHeight) / itemTop) * 100
        window.readed.innerHTML = result > 100 ? 100 : Math.round(result)
      }}
      className="w-full max-h-screen overflow-x-hidden overflow-y-auto"
    >
      <Seo title={`Blog | ${title}`} image={cover} description={description} />
      <nav className="absolute xl:fixed top-0 left-0 z-20" id="top">
        <Burguer />
      </nav>

      <div className="bg-white">
        <div
          className="w-full overflow-hidden flex items-end"
          style={{ minHeight: "10rem" }}
        >
          <div className="absolute hidden lg:block text-light-70 bottom-0 uppercase text-sm right-0 z-10 p-6">
            {createdTime}, <b>{timeToRead}min</b>
          </div>
          <div
            id="postCover"
            className="absolute inset-0 bg-black z-1"
            style={{ opacity: 0.3 }}
          />
          <img className="w-full" src={cover} alt="cargando..." />
        </div>
        <div className="p-6 lg:p-16 max-w-6xl mx-auto">
          <h1 className="uppercase text-2xl xl:text-5xl m-0 font-sans">{title}</h1>
        </div>
      </div>
      <div className="bg-yellow lg:bg-white lg:-mt-16">
        <div className="px-6 py-5 font-bold uppercase text-xs xl:text-sm text-dark-80 lg:text-dark-50 cursor-default lg:px-16 max-w-6xl mx-auto flex items-center flex-wrap space-x-2">
          {tags.join(" • ")}
        </div>
      </div>
      <div className="flex lg:mt-12">
        <div
          className="post"
          dangerouslySetInnerHTML={{
            __html: contentToRender,
          }}
        />

        <div className="toc">
          <div
            hidden={!toc}
            className="content"
            dangerouslySetInnerHTML={{ __html: toc }}
          />
          <div className="sticky top-0 mt-16 flex flex-col items-center pb-8 text-dark-60 min-h-screen justify-end -mr-2">
            <div className="flex items-center space-x-1 text-sm">
              <div className="flex items-center">
                <ReadOutlined className="mr-1 text-base" />
                <div>{timeToRead}min.</div>
              </div>
              <div className="text-black">/</div>
              <b>
                <span id="readed">0</span> %
              </b>
            </div>
          </div>
          <div className="hider post z-2" />
        </div>
      </div>

      <div id="author" className="flex border-t border-dark-10">
        <div className="max-w-4xl mx-auto flex w-full px-6 lg:px-16 z-10">
          <div
            style={{ minWidth: "50%" }}
            className="flex-grow pr-8 mb-2 flex justify-center flex-col sm:items-end"
          >
            <div className="text-xl font-bold">{profile.name}</div>
            <div className="flex space-x-1 mt-3 items-center">
              <Socials pageContext={profile} />
              <div className="h-1px bg-dark-10 w-6" />
            </div>
          </div>
          <a href={`/blog/${username}`} className="-mt-8 mb-3">
            <img
              title="Ver perfil"
              className="object-cover shadow rounded h-32 w-32 lg:h-40 lg:w-40 bg-white"
              src={profile.image}
              alt={username}
            />
          </a>
        </div>
      </div>
      <div
        className="pt-32 border-t border-dark-05 border-dashed border-b min-h-screen flex items-center justify-center pb-10"
        style={{ background: "rgba(0,0,0,.01)" }}
      >
        <p>
          <img
            src={require("../assets/image/reading-side.svg")}
            alt="COMPLETADA"
            className="w-full px-6 max-w-xl mx-auto"
          />
          <b className="text-2xl sm:text-4xl text-center block mt-2 px-6">
            ¡Haz completado la lectura!
          </b>
        </p>
      </div>
      <div className="px-6 lg:px-16 py-24 bg-white max-w-4xl mx-auto">
        <DiscussionEmbed
          shortname="nodeschoolsm"
          config={{
            url: `https://nodeschoolsm.io${path}`,
            identifier: path,
            title,
          }}
        />
      </div>

      <Marquee/>
      <Footer />
    </div>
  )
}
