import React, { useEffect, useState } from "react"
import Footer from "../components/footer"
import Burguer from "../components/burguer"
import Seo from "../components/seo"
import Marquee from "../components/marquee"
import HomeContent from "../components/home"
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
    setIsDesktop(window.innerWidth > 1023)
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
          window.video.style.opacity = 1.2 - currentScroll / window.innerHeight
        }
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
          <div className="bg-yellow h-2 w-8 absolute top-0 right-0 z-10 mt-4" />
          <video
            id="video"
            hidden={!isDesktop}
            loop
            style={{
              height: videoHeight,
            }}
            className="w-full object-cover absolute"
            src={require("../assets/video/home.mp4")}
            autoPlay
            muted
          />
          <img
            style={{
              height: "74vh",
            }}
            className="w-full object-cover absolute"
            src={require("../assets/image/video-placeholder.jpg")}
            hidden={isDesktop}
          />
          <div
            style={{
              minHeight: isDesktop ? videoHeight : "66vh",
            }}
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
            <HomeContent />
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
          netlify-honeypot="botss"
        >
          <input type="hidden" name="botss" />
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
          />
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
