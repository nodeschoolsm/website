import React from "react"
import Footer from "./footer"
import Nav from "./nav"
export default ({ children = null }) => {
  return (
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto bg-white">
      <Nav />
      {children}
      <Footer />
    </div>
  )
}
