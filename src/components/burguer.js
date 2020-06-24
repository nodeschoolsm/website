import React from "react"

export default ({ style = {}, className = "" }) => {
  return (
    <div
      id="nav"
      tabIndex="0"
      onBlur={() => {
        window.nav.classList.remove("open")
      }}
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
        style={{
          minHeight: "15rem",
          height: "24rem",
          boxShadow: "0 0 0 100vmax rgba(255,255,255,0.9)",
        }}
        className="absolute bg-black menu shadow-xl invisible top-0 left-0 bottom-0 py-16"
      >
        <div
          onScroll={e => e.preventDefault()}
          className="overflow-x-hidden text-right overflow-y-auto px-8 flex flex-col text-xl font-bold items-start h-full text-white"
        >
          <div className="flex-grow"></div>
          <a href="/" className="my-2px" target="_self">
            Homepage
          </a>

          <a href="/events/open-hack-day" className="my-2px">
            Open Hack Day
            <span className="text-xs font-light uppercase italic">/Event</span>
          </a>
          <a href="/events/web-summit" className="my-2px">
            WebSummit
            <span className="text-xs font-light uppercase italic">/Event</span>
          </a>
          <a href="/events/codevent" className="my-2px">
            CODEVENT
            <span className="text-xs font-light uppercase italic">/Event</span>
          </a>
          <a href="/events" className="my-2px">
            Todos los eventos
          </a>

          <a href="/speakers" className="my-2px">
            Presentations
          </a>
          <a href="/speakers" className="my-2px">
            Event speakers
          </a>
          <a href="/sponsors" className="my-2px">
            Sponsors
          </a>
          <a href="/blog" className="my-2px">
            Blog
          </a>
          <div className="bg-light-90 w-full h-1px mt-4" />
        </div>
      </div>
    </div>
  )
}
