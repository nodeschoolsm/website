import React from "react"

export default ({ children = "MARQUEE" }) => {
  return (
    <div
      style={{ fontSize: "13rem" }}
      className="bg-yellow w-full select-none py-4 font-black uppercase flex items-center whitespace-no-wrap"
    >
      <span className="marquee">{children}</span>
    </div>
  )
}
