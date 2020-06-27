import React from "react"
import { UserAddOutlined } from "@ant-design/icons"
export default () => {
  return (
    <section className="w-full bg-white pt-16 pb-24">
      <img
        src={require("../assets/image/meditating.svg")}
        alt=""
        className="w-full mx-auto max-w-xl mt-24"
      />
      <div className="text-center mt-12 font-black text-2xl lg:text-4xl">
        PUBLICA TU ENTRADA
      </div>
      <p className="text-dark-70 text-sm p-6 mx-auto text-center">
        Las entradas del blog son hechas por organizadores y miembros de la
        comunidad con los qué estamos completamente agradecidos. Si gustas
        colaborar con una entradas, por favor llena este <b>formulario</b> para
        asignarte un usuario.
      </p>
      <p className="mx-auto px-6 mt-10 lg:mt-0">
        <form
          onSubmit={e => {
            e.preventDefault()
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: [
                { name: "form-name", value: "request-blog-access" },
                ...e.currentTarget.querySelectorAll("input"),
              ]
                .map(({ value, name }) => {
                  return (
                    encodeURIComponent(name) + "=" + encodeURIComponent(value)
                  )
                })
                .join("&"),
            })
              .then(() => {
                window.location.href = "/form-submitted"
              })
              .catch(console.error)
          }}
          data-netlify="true"
          name="request-blog-access"
          method="POST"
          className="flex flex-col space-y-4 text-base"
        >
          <div>
            <label className="text-xs mb-1 block">Nombre y Apellido</label>
            <input
              required
              className="border-b-2 px-2 w-full border-dark-70 pb-1"
              name="name"
              type="text"
              placeholder="Leonardo Antonio"
            />
          </div>
          <div className="flex space-y-4 xl:space-y-0 xl:space-x-4 flex-wrap xl:flex-no-wrap">
            <div className="w-full xl:w-1/2">
              <label className="text-xs mb-1 block">Username deseado</label>
              <input
                required
                className="border-b-2 px-2 w-full border-dark-70 pb-1"
                name="username"
                type="text"
                placeholder="LeoN98"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="text-xs mb-1 block">Gmail</label>
              <input
                required
                className="border-b-2 px-2 w-full border-dark-70 pb-1"
                name="gmail"
                type="email"
                placeholder="email@gmail.com"
              />
            </div>
          </div>
          <div className="flex justify-end pt-8">
            <button
              type="submit"
              className="bg-dark-05 hover:border-dark-10 flex space-x-2 items-center border-2 border-dark-05 cursor-pointer px-12 py-3 font-bold"
            >
              <UserAddOutlined className="text-2xl" />
              <div>Solicitar acceso</div>
            </button>
          </div>
        </form>
      </p>
    </section>
  )
}
