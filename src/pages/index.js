import React from "react"
import Page, { Title } from "../components/Page"
import VideoBackground from "../components/VideoBackground"
import Helmet from "react-helmet"
import Gallery from "../components/Gallery"
import Footer from "../components/Footer"
import Noders from "../components/Noders"
import Contact from "../components/Contact"
import Sponsors from "../components/Sponsors"
import useSWR from "swr"
import { css } from "emotion"
import { Button } from "antd"
import Slack from "../assets/slack.component.svg"
import { getMetas, title } from "../siteMetaData.js"
import Events from "../components/Events"
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

const URL = `https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/meetup`
export default () => {
  const { data } = useSWR(URL, url => fetch(url).then(r => r.json()), {
    shouldRetryOnError: false,
    initialData: {}
  })
  const { noders = [], photos = [], totalMembers = 0 } = data
  return (
    <>
      <VideoBackground />
      <div className="flex p-8 flex-col items-center justify-center min-h-screen">
        <Helmet title={title} children={getMetas()} />
        <Page id="about">
          <Title text="Nodeschool San Miguel" />
          <img
            src={require("../assets/logo.svg")}
            alt="logo"
            className="mb-6"
            style={{ maxWidth: "10rem" }}
          />
          <p className="max-w-xl pt-2 text-xl text-justify">
            Nodeschool San Miguel, intenta impartir conocimiento sobre
            tecnologías de desarrollo más novedosas, y mayormente utilizadas en
            el mundo por otras comunidades de desarrolladores o empresas de
            renombre internacional y nacionalmente.
          </p>
          <p className="max-w-xl pt-2 text-xl mb-12 text-justify">
            La dinámica es que cualquier persona puede dar un taller o una
            charla con respecto a temas de tecnología preferiblemente, pero no
            estamos cerrados a que se impartan recursos sobre otro tipo de
            conocimientos que pueden estar relacionados con la informática
            indirectamente, ya que al final de cuentas todo trata en adquirir
            conocimiento que pueda ser de utilidad en el mundo laboral, y ¿por
            qué no en el del emprendedor?.
          </p>
          <BorderBottomTitle text="Visión" />
          <p className="max-w-xl pt-2 text-xl text-justify">
            Nuestra visión es posicionarnos local e internacionalmente como una
            comunidad apasionada por el desarrollo web y el aprendizaje
            colectivo.
          </p>
          <BorderBottomTitle text="Misión" className="mt-6" />
          <p className="max-w-xl pt-2 text-xl text-justify">
            Nuestra misión es ser una comunidad que sirva como canal de
            conocimiento colectivo y gratuito de calidad impartiendo distintas
            series de eventos, retos, charlas y talleres para la comunidad de
            desarrolladores en El Salvador.
          </p>
          <div
            onClick={() =>
              window.open("http://slack.nodeschoolsm.io", "_blank")
            }
            style={{ background: "rgba(0,0,0,.07)" }}
            className="p-4 md:px-8 flex items-center justify-center cursor-pointer hover:shadow mt-8 rounded font-bold text-black md:text-xl"
          >
            <Slack width="30px" />
            <span className="ml-1 text-center">Unete al slack de la comunidad</span>
          </div>
        </Page>
        <Gallery photos={[...photos].splice(0, 6)} />
        <Page id="noders">
          <Title text="NODERS" />

          <p className="max-w-xl pt-2 text-xl text-center">
            Usamos meetup como plataforma para controlar los eventos y
            promoverlos, si quieres estar más pendiente de la comunidad te
            invitamos a unirte al grupo de la comunidad en meetup.
          </p>
          <BorderBottomTitle
            text={`Somos ${totalMembers} noders`}
            className="my-6"
          />
          <p className="max-w-xl text-xs pt-2 text-center">
            Unas <b>casí</b> random pics de los noders
          </p>
          <Noders noders={noders} />

          <Button
            size="large"
            type="dashed"
            className="mt-12"
            onClick={() => {
              window.open("https://www.meetup.com/nodeschoolsm", "_blank")
            }}
          >
            <div className="flex items-center justify-center">
              Unirme al Meetup
              <img
                className="w-6 ml-1"
                src="https://secure.meetupstatic.com/s/img/786824251364989575000/logo/swarm/m_swarm_630x630.png"
                alt="meetup"
              />
            </div>
          </Button>
        </Page>

        <Page id="events">
          <Title text="Últimos eventos" />
          <p className="max-w-xl pt-2 text-xl text-center">
            En Nodeschool San Miguel realizamos distintos eventos{" "}
            <em>"Nodeschool Meetups"</em>, que se ejecutan regularmente cada
            último sábado en cada mes del año, <em>"CODEVENTS"</em> que se
            realizán el penultimo sábado de cada trimestre, y los{" "}
            <em>"Hack Days"</em> que se llevan a cabo en la primera semana de
            Diciembre.
          </p>
          <Events />
        </Page>

        <Page
          id="sponsors"
          className="border-b border-black-50 border-dashed mt-12 sm:mt-0"
        >
          <Title text="Sponsors y colaboradores" />
          <p className="max-w-xl pt-2 text-xl text-center mb-20">
            Desde que iniciamos la comunidad, en poco tiempo empezamos a recibir
            patrocinio y ayuda de distintas instituciones, comunidades y
            personas con las cuales estamos muy agradecidos.
          </p>
          <Sponsors />
          <p className="max-w-xl pt-2 text-center mt-56 mb-6 md:mb-0">
            Miralos en meetup:{" "}
            <a href="meetup.com/nodeschoolsm/sponsors">
              meetup.com/nodeschoolsm/sponsors
            </a>
          </p>
        </Page>
        <Contact />
      </div>
      <Footer />
    </>
  )
}
