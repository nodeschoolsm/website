import React from "react"
import Container from "../layouts/Conainer"
import Helmet from "react-helmet"
export default () => (
  <Container className="flex flex-col p-8 items-center justify-center min-h-screen">
    <Helmet title="Nodeschool San Miguel">
      <meta name="yandex-verification" content="a3512b4ed07068b8" />
    </Helmet>

    <div className="text-2xl uppercase font-bold mb-6 underline">
      Construyendo sitio
    </div>
    <img src={require("../assets/logo.svg")} className="w-64" alt="logo" />
    <p className="mt-4">Here will be unicorns!</p>
  </Container>
)
