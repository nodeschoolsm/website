import React from "react"
import Burguer from "../components/burguer"

export default () => {
  return (
    <nav className="z-10 bg-white w-full flex items-center sticky top-0 border-b border-dark-10">
      <Burguer className="z-1 sticky top-0" />
      <div className="text-black mx-8 text-sm">AUTORES</div>
      <div
        style={{ minWidth: 6, minHeight: 6 }}
        className="rounded-full mx-6 bg-dark-15"
      />
      <div className="flex-grow" />
      <div className="h-1px bg-dark-05 flex-grow ml-8 mr-16 max-w-4xl lg:w-full"></div>
    </nav>
  )
}
