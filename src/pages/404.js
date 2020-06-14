import React from "react"
import Footer from "../components/footer"
import Marquee from "../components/marquee"
export default () => {
  return (
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto bg-white">
      <h1 className="text-center text-4xl lg:text-6xl px-8 pt-4 max-w-5xl mx-auto">
        No pudimos encontrar la página que buscas
      </h1>
      <div className="flex justify-center">
        <img
          className="w-full"
          style={{ minWidth: "40rem" }}
          src={require("../assets/image/404.svg")}
          alt=""
        />
      </div>
      <Marquee>NODESCHOOL SAN MIGUEL,</Marquee>
      <Footer />
    </div>
  )
}
