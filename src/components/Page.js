import React from "react"

export default ({ children = null, id = "none", className="" }) => {
  return (
    <div
      id={id}
      className={`${className} min-h-screen w-full p-2 md:px-40 md:py-24 flex flex-col justify-start items-center`}
    >
      {children}
    </div>
  )
}

export const Title = ({ text = "" }) => {
  return (
    <div className="mb-12 text-3xl md:text-5xl text-black font-bold text-center">
      {text}
    </div>
  )
}
