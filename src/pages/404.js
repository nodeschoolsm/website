import React from "react"
import Footer from "../components/Footer"

export default () => {
  return (
    <>
      <div className="p-32 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">404 - Oh, no.</h1>
        <p className="text-2xl">
          La página que buscas no ha sido encontrada 😭
        </p>
      </div>
      <Footer />
    </>
  )
}
