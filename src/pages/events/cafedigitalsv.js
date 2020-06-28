import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
import { graphql } from "gatsby"
export default ({ data }) => {
  const [episodes, setEpisodes] = useState([])
  useEffect(() => {
    Promise.all(
      data.result.episodes.map(({ data: [banner, url] }) => {
        const version = banner.relativePath.split("/")[0]
        return new Promise(send => {
          fetch(url.publicURL)
            .then(r => r.text())
            .then(url => {
              send({
                banner: banner.publicURL,
                version,
                url,
              })
            })
        })
      })
    ).then(arr => setEpisodes(arr.sort((a, b) => a.version - b.version)))
  }, [data])
  return (
    <Layout>
      <img
        className="w-full"
        src={require("../../assets/image/cafedigitalsv/cover.png")}
        alt="@CAFEDIGITALSV"
      />
      <div className="bg-dark-10 px-6 py-12 xl:py-24 border-t border-dark-10">
        <div className="max-w-4xl mx-auto">
          <div className="lg:text-xl text-center">
            <b>Café Digital:</b> Un espacio para hablar y discutir sobre temas
            que están a la vanguardia sobre tecnología, experiencias en el mundo
            laboral y profesional junto a los miembros de la comunidad de
            NodeSchool San Miguel.
          </div>
        </div>
      </div>
      <div className="px-6 py-12 xl:py-24 bg-dark-05">
        <div className="max-w-4xl mx-auto">
          <h1 className="w-full font-bold text-center mb-20 text-5xl">
            EVENT HOSTS
          </h1>
          <div className="flex flex-wrap">
            <div className="flex-grow p-3 flex flex-col items-center w-56">
              <img
                className="w-32 h-32 shadow-inner object-cover rounded-full bg-yellow"
                src={require("../../assets/image/cafedigitalsv/ade.jpeg")}
                alt="Adelina Gutiérrez"
              />
              <a
                title="Twitter de Adelina"
                className="mt-2 font-bold text-lg md:text-base"
                href="https://twitter.com/gsnathy"
              >
                Adelina Gutiérrez
              </a>
            </div>
            <div className="flex-grow p-3 flex flex-col items-center w-56">
              <img
                className="w-32 h-32 shadow-inner object-cover rounded-full bg-yellow"
                src={require("../../assets/image/cafedigitalsv/gemon.jpg")}
                alt="Jorge Monge"
              />
              <a
                title="Twitter de Monge"
                className="mt-2 font-bold text-lg md:text-base"
                href="https://twitter.com/monge1h"
              >
                Jorge Monge
              </a>
            </div>
            <div className="flex-grow p-3 flex flex-col items-center w-56">
              <img
                className="w-32 h-32 shadow-inner object-cover rounded-full bg-yellow"
                src={require("../../assets/image/cafedigitalsv/kris.jpg")}
                alt="Christopher Fuentes"
              />
              <a
                title="Twitter de Chris"
                className="mt-2 font-bold text-lg md:text-base"
                href="https://twitter.com/chrisft25"
              >
                Christopher Fuentes
              </a>
            </div>
          </div>
          <h1 className="w-full font-bold text-center mb-20 mt-24 text-5xl">
            EPISODIOS
          </h1>
          <div className="space-y-2 flex flex-col">
            {episodes.map(({ banner, url, version }) => {
              return (
                <a
                  title={`Escuchar Episodio ${version}`}
                  className="rounded-md overflow-hidden"
                  key={`cafe-${version}`}
                  href={url}
                >
                  <img loading="lazy" src={banner} />
                </a>
              )
            })}
          </div>
          <h1>Proponé una charla</h1>
          <p>
            Envía tu propuesta a{" "}
            <a href="https://airtable.com/shrK5FnfdQstxmpeW" title="Formulario">
              <b>este formulario.</b>
            </a>
            <br />
            De antemano te agradecemos muchísimo y por cierto, si no te
            contactamos por tu propuesta no te decepciones, nosotros no
            descartamos propuestas ya que realizamos una gran diversidad de
            eventos y quizá estemos guardandola para otro lugar dónde se pueda
            lucir mejor : ).
          </p>
          <p>
            Mira todos los eventos que realizamos{" "}
            <a title="Ver todos los eventos de la comunidad" href="/events">
              <i>acá</i>
            </a>
            .
          </p>
          <h1>Escuchános</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://anchor.fm/cafedigitalsv/embed" height="220" width="100%" frameborder="0" scrolling="no"></iframe>`,
            }}
          />
          <p className="mx-auto -mt-8 md:mt-auto">
            <i className="text-5xl leading-none">Sí,</i> el Café Digital se
            graba en vivo en el{" "}
            <a href="https://discord.nodeschoolsm.io">
              <i>Server de Discord de la comunidad</i>
            </a>
            .{" "}
          </p>
          <p className="mx-auto">
            En{" "}
            <a title="Nuestro twitter" href="https://twitter.com/cafedigitalsv">
              <b>Twitter</b>
            </a>{" "}
            e{" "}
            <a
              title="Nuestro instagram"
              href="https://instagram.com/cafedigitalsv"
            >
              <b>Instagram</b>
            </a>{" "}
            compartimos información de próximos eventos y distribución del
            evento cómo Podcast.
          </p>

          <p className="mx-auto">
            Es complicado contarte cómo funciona, mejor se parte de un café
            junto a todos los miembros de la comunidad ❤️.
          </p>
          <div className="flex w-full space-x-6 items-center mt-16">
            <div className="flex space-x-2">
              <a
                title="Escuchar en Apple Podcasts"
                href="https://anchor.fm/cafedigitalsv"
              >
                <img
                  className="h-10 lg:h-8"
                  src={require("../../assets/image/cafedigitalsv/icons/apple.svg")}
                  alt="Apple"
                />
              </a>
              <div className="w-1px h-10 bg-dark-10" />
              <a
                title="Escuchar en Soundcloud"
                href="https://soundcloud.com/cafedigitalsv"
              >
                <img
                  className="h-10 lg:h-8"
                  src={require("../../assets/image/cafedigitalsv/icons/soundcloud.svg")}
                  alt="Soundcloud"
                />
              </a>
              <div className="w-1px h-10 bg-dark-10" />
              <a
                title="Escuchar en Spotify"
                href="https://open.spotify.com/show/1L0KFABRuwsKCAAJDigD4C"
              >
                <img
                  className="h-10 lg:h-8"
                  src={require("../../assets/image/cafedigitalsv/icons/spotify.svg")}
                  alt="Spotify"
                />
              </a>
            </div>
            <div className="h-4px flex-grow bg-dark-85"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Content {
    result: allFile(
      filter: { sourceInstanceName: { eq: "cafeEpisodios" } }
      sort: { order: ASC, fields: name }
    ) {
      episodes: group(field: dir) {
        data: nodes {
          name
          publicURL
          relativePath
        }
      }
    }
  }
`
