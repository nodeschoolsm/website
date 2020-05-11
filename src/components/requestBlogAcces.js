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
      <p className="text-dark-70 text-sm p-6 mx-auto text-center lg:text-left">
        Estás viendo todas las entradas en el blog, estas entradas son hechas
        por colaboradores y miembros de la comunidad con los qué estamos
        completamente agradecidos. Si gustas colaborar con una entradas por
        favor llena este <b>formulario</b> para notificar a los organizadores y
        asignarte un usuario.
      </p>
      <p className="mx-auto px-6 mt-10 lg:mt-0">
        <form
          data-netlify="true"
          name="request-blog-access"
          target="_self"
          action="/form-submitted"
          method="POST"
          className="flex flex-col space-y-4 text-base"
        >
          <div>
            <label className="text-xs mb-1 w-full">Nombre y Apellido</label>
            <input
              required
              className="border-b-2 px-2 w-full border-dark-70 pb-1"
              name="name"
              type="text"
              placeholder="Leonardo Antonio"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="text-xs mb-1 w-full">Username deseado</label>
              <input
                required
                className="border-b-2 px-2 w-full border-dark-70 pb-1"
                name="username"
                type="text"
                placeholder="NodeschoolSM"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs mb-1">Gmail</label>
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
              <UserAddOutlined className="text-xl" />
              <div>Solicitar acceso</div>
            </button>
          </div>
        </form>
      </p>
    </section>
  )
}
