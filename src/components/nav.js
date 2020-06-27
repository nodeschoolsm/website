import React from "react"
import Burguer from "../components/burguer"
import { useLocation } from "@reach/router"
export default () => {
  const { pathname = "/" } = useLocation()
  const basePath = pathname.replace("/", "").split("/").shift()
  return (
    <nav className="z-10 shadow bg-white w-full flex items-center sticky top-0">
      <Burguer style={{ minWidth: "4rem" }} className="z-1 sticky top-0" />
      <a
        href={`/${basePath}`}
        target="_self"
        className="text-black font-bold mx-8 uppercase"
      >
        {basePath}
      </a>
      <div
        style={{ minWidth: 6, minHeight: 6 }}
        className="rounded-full mx-6 bg-dark-15"
      />
      <div className="flex-grow" />
      <div className="h-1px bg-dark-05 flex-grow ml-8 mr-16 max-w-4xl lg:w-full"></div>
    </nav>
  )
}
