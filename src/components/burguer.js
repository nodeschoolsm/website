import React from "react"

export default ({ style = {}, className = "" }) => {
  return (
    <div
      id="nav"
      style={style}
      className={`bg-black flex justify-center w-16 h-16 pt-1 ${className}`}
    >
      <div
        className="mt-4 burguer h-6 z-10 cursor-pointer"
        onClick={() => {
          window.nav.classList.toggle("open")
        }}
      >
        <div className="w-6 bg-white my-1 h-3px" />
        <div className="w-6 bg-white my-1 h-3px" />
        <div className="w-5 bg-white my-1 h-3px" />
      </div>
      <div
        style={{ minHeight: "15rem", height: "calc(100vh - 16rem)" }}
        className="absolute bg-black menu shadow-xl invisible top-0 left-0 bottom-0 py-16"
      >
        <div
          onScroll={e => e.preventDefault()}
          className="overflow-x-hidden text-right overflow-y-auto px-8 flex flex-col text-xl font-bold items-end h-full text-white"
        >
          <div className="flex-grow"></div>
          <a href="#" className="my-2px">Homepage</a>
          <a href="#" className="my-2px">
            Nodeschool - Meetups
            <span className="text-xs font-light uppercase italic">
              /Eventos
            </span>
          </a>
          <a href="#" className="my-2px">
            Open Hack Day
            <span className="text-xs font-light uppercase italic">
              /Eventos
            </span>
          </a>
          <a href="#" className="my-2px">
            NerdTalk
            <span className="text-xs font-light uppercase italic">
              /Eventos
            </span>
          </a>
          <a href="#" className="my-2px">
            WebSummit
            <span className="text-xs font-light uppercase italic">
              /Eventos
            </span>
          </a>
          <a href="#" className="my-2px">
            CODEVENT
            <span className="text-xs font-light uppercase italic">
              /Eventos
            </span>
          </a>
          <a href="#" className="my-2px">Speakers</a>
          <a href="#" className="my-2px">Sponsors</a>
          <a href="#" className="my-2px">Blog</a>
          <div className="bg-light-90 w-full h-1px mt-4" />
        </div>
      </div>
    </div>
  )
}
