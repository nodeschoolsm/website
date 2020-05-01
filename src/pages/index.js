import React from "react"
import Footer from "../components/footer"
import Burguer from "../components/burguer"
import Marquee from "../components/marquee"
const logo = require("../assets/image/logo.png")
export default () => {
  const videoHeight = "calc(100vh + 5rem)"
  const sliderWidth = "12rem"
  const minNavHeight = "100vh - 13rem"
  let isDesktop = false
  if (typeof window != "undefined") {
    isDesktop = window.innerWidth > 600
  }
  return (
    <div
      onScroll={e => {
        const currentScroll = e.target.scrollTop
        window.nav.style.height = `calc(${minNavHeight} - ${
          currentScroll * 0.6
        }px)`
      }}
      className="flex flex-col max-h-screen overflow-y-auto overflow-x-hidden"
    >
      <div className="flex">
        <div
          id="particles"
          onClick={e => {
            if (document.body.animate) {
              const createParticle = (x, y) => {
                const particle = document.createElement("particle")
                document.body.appendChild(particle)
                const size = 5 + Math.floor(Math.random() * 15)
                particle.style.zIndex = 20
                particle.style.width = `${size}px`
                particle.style.height = `${size}px`
                particle.style.background = `hsl(${
                  35 + Math.random() * 70
                }, 90%, 60%)`
                const destinationX = 16 + x + (Math.random() - 0.5) * 2 * 75
                const destinationY = 16 + y + (Math.random() - 0.5) * 2 * 75
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
                    duration: 500 + Math.random() * 900,
                    easing: "cubic-bezier(0, .9, .48, 1)",
                    delay: Math.random() * 190,
                  }
                )
                animation.onfinish = () => {
                  particle.remove()
                }
              }
              for (let i = 0; i < 30; i++) {
                createParticle(e.clientX, e.clientY)
              }
            }
          }}
          className="bg-white sticky top-0 h-screen z-10 shadow-xl hidden lg:flex flex-col items-center px-4 py-8"
          style={{ minWidth: sliderWidth, maxWidth: sliderWidth }}
        >
          <img src={logo} alt="logo" className="w-24" />
          <b className="uppercase text-xl w-full text-center mt-4">
            Nodeschool San Miguel
          </b>
          <Burguer
            className="absolute bg-black right-0 w-16 -mr-6 flex justify-center"
            style={{
              minHeight: "3.75rem",
              height: `calc(${minNavHeight})`,
              paddingTop: 0,
              marginTop: "16rem",
            }}
          />
        </div>
        <div className="flex-grow" style={{ minHeight: videoHeight }}>
          <div className="bg-yellow h-2 w-8 absolute top-0 right-0 z-10 mt-4"></div>
          <div
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "100% 100%",
            }}
            className="absolute right-0 mr-10 top-0 z-10 bg-black text-white py-4 px-6 uppercase font-black"
          >
            TECH COMMUNITY
          </div>
          <video
            loop
            style={{
              height: videoHeight,
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
            style={{ minHeight: videoHeight }}
            className="w-full bg-light-25"
          />
          <div className="min-h-screen w-full py-24 pr-16 pl-20">
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
      <div className="bg-dark-95 flex justify-center">
        <form className="flex flex-col p-6 my-32 w-full max-w-xl text-white">
          <h2>Contactanos</h2>
          <label for="name" className="mt-2 mt-4 text-xs">
            Nombre
          </label>
          <input
            className="border-light-60 border-b-2 bg-transparent mb-3 p-3"
            type="text"
            name="name"
            placeholder="Jhon Doe"
          />
          <label for="email" className="mt-3 text-xs">
            Email
          </label>
          <input
            className="border-light-60 border-b-2 bg-transparent mb-3 p-3"
            type="text"
            name="email"
            placeholder="email@dominio.com"
          />
          <label for="message" className="mt-3 text-xs">
            Mensaje
          </label>
          <textarea
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
