import React from "react"
import Page, { Title } from "../components/Page"
import VideoBackground from "../components/VideoBackground"
import Helmet from "react-helmet"
import Gallery from "../components/Gallery"
import Footer from "../components/Footer"
import Noders from "../components/Noders"
import Contact from "../components/Contact"
import { css } from "emotion"
const BorderBottomTitle = ({ text = "", className = "" }) => {
  return (
    <div
      className={
        `text-3xl md:text-4xl font-bold text-black ${className} ` +
        css`
          display: inline-block;
          overflow: hidden;
          position: relative;
          &::after {
            content: "";
            width: 104%;
            position: absolute;
            left: -2%;
            top: 56%;
            height: 50%;
            z-index: -1;
            background: #ffde00;
          }
        `
      }
    >
      {text}
    </div>
  )
}

export default () => (
  <>
    <VideoBackground />
    <div className="flex p-8 flex-col items-center justify-center min-h-screen">
      <Helmet title="Nodeschool San Miguel" />
      <Page id="about">
        <Title text="Nodeschool San Miguel" />
        <img
          src={require("../assets/logo.svg")}
          alt="logo"
          className="mb-6"
          style={{ maxWidth: "10rem" }}
        />
        <p className="max-w-xl pt-2 text-xl text-justify">
          Nodeschool San Miguel, intenta impartir conocimiento sobre tecnologías
          de desarrollo más novedosas, y mayormente utilizadas en el mundo por
          otras comunidades de desarrolladores o empresas de renombre
          internacional y nacionalmente.
        </p>
        <p className="max-w-xl pt-2 text-xl mb-12 text-justify">
          La dinámica es que cualquier persona puede dar un taller o una charla
          con respecto a temas de tecnología preferiblemente, pero no estamos
          cerrados a que se impartan recursos sobre otro tipo de conocimientos
          que pueden estar relacionados con la informática indirectamente, ya
          que al final de cuentas todo trata en adquirir conocimiento que pueda
          ser de utilidad en el mundo laboral, y ¿por qué no en el del
          emprendedor?.
        </p>
        <BorderBottomTitle text="Visión" />
        <p className="max-w-xl pt-2 text-xl text-justify">
          Nuestra visión es posicionarnos local e internacionalmente como una
          comunidad apasionada por el desarrollo web y el aprendizaje colectivo.
        </p>
        <BorderBottomTitle text="Misión" className="mt-6" />
        <p className="max-w-xl pt-2 text-xl text-justify">
          Nuestra misión es ser una comunidad que sirva como canal de
          conocimiento colectivo y gratuito de calidad impartiendo distintas
          series de eventos, retos, charlas y talleres para la comunidad de
          desarrolladores en El Salvador.
        </p>
      </Page>
      <Gallery />
      <Page id="noders">
        <Title text="NODERS" />
        <Noders />
      </Page>
      <Page id="sponsors">
        <Title text="Sponsors y colaboradores" />
      </Page>
      <Contact />
     
    </div>
    <Footer />
  </>
)
