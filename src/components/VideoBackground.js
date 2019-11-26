import React, { useState } from "react"
import { Drawer, Button } from "antd"
const menuContent = [
  {
    label: "Manifesto",
    links: "#about"
  },
  {
    label: "Sponsors",
    links: "#sponsors"
  },
  { label: "Blog", links: "http://blog.nodeschoolsm.io", isUrl: true },
  { label: "Contacto", links: "#contact" }
]
const handleURLOrID = ({ links = "#", isUrl = false }) => {
  if (isUrl) return window.open(links, "_blank")
  const $el = document.querySelector(links)
  if ($el) {
    $el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
export default () => {
  const [showDrawer, setDrawerOpen] = useState(false)
  return (
    <div className="w-screen relative flex items-center">
      <Drawer
        className="sm:hidden"
        title={
          <div className="text-xl uppercase font-bold">¿Donde quieres ir?</div>
        }
        placement="top"
        visible={showDrawer}
        bodyStyle={{
          minHeight: "12rem",
          display: "flex",
          alignItems: "center"
        }}
        onClose={() => setDrawerOpen(false)}
        children={
          <div className="min-h-full">
            {menuContent.map(({ label, ...props }) => {
              return (
                <div
                  onClick={() => {
                    handleURLOrID(props)
                    setDrawerOpen(false)
                  }}
                  className="cursor-pointer text-black my-4 text-xl uppercase"
                >
                  {label}
                </div>
              )
            })}
          </div>
        }
      />
      <video
        autoPlay="1"
        muted="1"
        loop="1"
        className="w-screen"
        style={{ filter: "blur(1.5px)", minWidth: "150vh" }}
      >
        <source src={require("../assets/bg.mp4")} type="video/mp4" />
      </video>
      <div
        style={{ background: "rgba(0,0,0,.55)" }}
        className="absolute inset-0 flex items-center justify-center flex-col"
      >
        <div
          className="flex px-2 py-3 w-full items-center justify-end pr-4"
          style={{ background: "rgba(0,0,0,.08)" }}
        >
          {menuContent.map(({ label, ...props }) => {
            return (
              <div
                onClick={() => handleURLOrID(props)}
                className="sm:block hidden p-3 text-white-50 cursor-pointer hover:text-white"
              >
                {label}
              </div>
            )
          })}
          <Button
            onClick={() => setDrawerOpen(true)}
            className="sm:invisible"
            icon="menu"
            ghost
          />
        </div>
        <div className="max-w-xl flex text-white flex-grow items-center justify-center text-2xl sm:text-3xl my-2 mx-8 md:text-5xl font-bold text-center">
          Una comunidad de Desarrolladores para Desarrolladores.
        </div>
        <img
          src={require("../assets/icons/arrowdown.svg")}
          alt="⬇️"
          className="animated bounce infinite slow w-6 sm:w-auto"
        />
        <div className="pb-4"></div>
      </div>
    </div>
  )
}
