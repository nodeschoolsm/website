import React, { useEffect, useState } from "react"
import Footer from "../components/footer"
import Burguer from "../components/burguer"
import Seo from "../components/seo"
import Marquee from "../components/marquee"
const logo = require("../assets/image/logo.png")

const particles = e => {
  const createParticle = (x, y) => {
    const particle = document.createElement("particle")
    const size = 5 + Math.floor(Math.random() * 15)
    particle.style.zIndex = 20
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.opacity = 0
    particle.style.background = `hsl(${35 + Math.random() * 70}, 90%, 60%)`
    const destinationX = 16 + x + (Math.random() - 0.5) * 2 * 75
    const destinationY = 16 + y + (Math.random() - 0.5) * 2 * 75
    document.body.appendChild(particle)
    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: 600 + Math.random() * 900,
        easing: "cubic-bezier(0, .9, .48, 1)",
        delay: Math.random() * 160,
      }
    )
    animation.onfinish = () => {
      particle.remove()
    }
  }
  for (let i = 0; i < 35; i++) {
    createParticle(e.clientX, e.clientY)
  }
}

export default () => {
  const videoHeight = "calc(100vh + 5rem)"
  const sliderWidth = "12rem"
  const minNavHeight = "100vh - 13rem"
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    //hooking to acces window
    if (typeof window === "undefined") return
    setIsDesktop(window.innerWidth > 600)
    window.onresize = () => setIsDesktop(window.innerWidth > 600)
  })
  return (
    <div
      onScroll={e => {
        const currentScroll = e.target.scrollTop
        if (isDesktop) {
          window.nav.style.height = `calc(${minNavHeight} - ${
            currentScroll * 0.6
          }px)`
        }
        window.video.style.opacity = 1.2 - currentScroll / window.innerHeight
      }}
      className="flex flex-col max-h-screen overflow-y-auto overflow-x-hidden"
    >
      <Seo />
      <div className="flex">
        <div
          id="particles"
          onClick={particles}
          className="bg-white sticky top-0 h-screen z-10 shadow-xl hidden lg:flex flex-col items-center px-4 py-8"
          style={{ minWidth: sliderWidth, maxWidth: sliderWidth }}
        >
          <img src={logo} alt="logo" className="w-24" />
          <b className="uppercase text-xl w-full text-center mt-4">
            Nodeschool San Miguel
          </b>
          {isDesktop && (
            <Burguer
              className="absolute bg-black right-0 w-16 -mr-6 flex justify-center z-1"
              style={{
                minHeight: "3.75rem",
                height: `calc(${minNavHeight})`,
                paddingTop: 0,
                marginTop: "16rem",
              }}
            />
          )}
        </div>
        <div className="flex-grow" style={{ minHeight: videoHeight }}>
          <div className="bg-yellow h-2 w-8 absolute top-0 right-0 z-10 mt-4"></div>
          <div
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "100% 100%",
            }}
            className="absolute right-0 mr-10 top-0 z-10 bg-black text-white invisible lg:visible py-4 px-6 uppercase font-black"
          >
            TECH COMMUNITY
          </div>
          <video
            id="video"
            loop
            style={{
              height: videoHeight,
              position: isDesktop || "fixed",
              filter: isDesktop
                ? "sepia(1) saturate(0)"
                : "saturate(5) grayscale(2)",
            }}
            className="w-full object-cover absolute"
            src={require("../assets/video/home.mp4")}
            autoPlay={isDesktop}
            muted
          />
          <div
            style={{ minHeight: isDesktop ? videoHeight : "66vh" }}
            className="w-full bg-light-25 z-2"
          >
            {isDesktop || (
              <div className="sticky top-0 z-10">
                <Burguer />
              </div>
            )}
          </div>
          <div className="min-h-screen bg-white w-full py-24 px-6 lg:pr-16 lg:pl-20 z-1">
            <img
              src={logo}
              className="mx-auto -mt-48 lg:hidden"
              alt="logo"
              style={{ maxWidth: "11rem" }}
            />
            <h1>Qué hacemos</h1>
            <p>
              Somos una comunidad en busca de conocimiento accesible para todas
              las personas. Colaboramos en esta odisea realizando distinta serie
              de eventos, nos encargamos de fomentar un espíritu de innovación y
              el deseo por un continuo aprendizaje en cada uno de estos eventos.
            </p>
            <h1>Nuetra misión</h1>
            <p>
              Ser una fuente de conocimiento colectivo, motivación, networking y
              descubrimiento propio para las personas apasionadas al desarrollo
              y la tecnología.
            </p>
            <h1>Nuetra visión</h1>
            <p>
              Fomentar un ambiente de conocimiento tecnológico accesible a todas
              las personas y así potenciar los talentos dentro de este,
              estableciéndose como una de las mejores comunidades para el
              desarrollo personal y profesional
            </p>
            <h1>Nuestros valores</h1>
            <p>
              <b>Aprender a enseñar y enseñar a aprender:</b> En Nodeschool San
              Miguel sabemos que todos pueden aprender algo de tí y que tú
              puedes aprender algo de todos, ¡Sí!, todos.
            </p>
            <p>
              <b>Integridad:</b> Se tu mismo, sé un Noder.
            </p>
            <p>
              <b>Igualdad:</b> Como comunidad tecnológica, creemos que el
              conocimiento debe ser bienvenido y valorado, sin importar de quién
              venga, ni el status o nivel académico de quien lo brinda. Esto
              permite que la comunidad sea diversa, no sólo en cuanto a
              conocimiento, sino también en cuanto a personas y experiencias
              personales.
            </p>
            <p>
              <b>Trabajo en equipo:</b> La razón por cual existimos es por el
              trabajo en conjunto que hacemos dentro de la comunidad, por ello
              siempre nos enfocamos en promover esta cultura en cada uno de
              nuestros miembros.
            </p>
            <p>
              <b> Diversidad:</b> En Nodeschool San Miguel, nos preocupamos por
              ofrecer algo nuevo que aprender en distintas temáticas e innovar
              así la comunidad.
            </p>
          </div>
        </div>
      </div>
      <Marquee>SAN MIGUEL, EL SALVADOR</Marquee>
      <div className="bg-dark-95 flex justify-center z-1">
        <form
          method="POST"
          action="/form-submitted"
          target="_self"
          name="contact-us"
          data-netlify="true"
          className="flex flex-col p-6 my-32 w-full max-w-xl text-white"
        >
          <h2>Contactanos</h2>
          <label className="mt-2 mt-4 text-xs">Nombre</label>
          <input
            required
            className="border-light-60 border-b-2 bg-transparent mb-3 p-3"
            type="text"
            name="name"
            placeholder="Jhon Doe"
          />
          <label className="mt-3 text-xs">Email</label>
          <input
            required
            className="border-light-60 border-b-2 bg-transparent mb-3 p-3"
            type="email"
            name="email"
            placeholder="email@dominio.com"
          />
          <label className="mt-3 text-xs">Mensaje</label>
          <textarea
            required
            className="border-light-60 border-b-2 bg-transparent mb-3 p-3"
            placeholder="Hola comunidad, tengo un comentario que hacer..."
            name="message"
            rows="3"
          ></textarea>
          <input
            type="submit"
            value="ENVIAR EMAIL"
            className="cursor-pointer mt-6 bg-yellow text-black font-black text-xl px-6 py-5"
          />
        </form>
      </div>
      <Footer />
    </div>
  )
}
