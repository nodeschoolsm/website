import React from "react"
import Footer from "../components/footer"
import { ArrowLeftOutlined } from "@ant-design/icons"
export default () => {
  return (
    <div className="max-h-screen overflow-auto">
      <div className="flex items-center mt-16 flex-col justify-center text-4xl uppercase font-black">
        Datos enviados exitosamente
        <img
          className="max-w-lg mt-6"
          src={require("../assets/image/unboxing.svg")}
          alt=""
        />
      </div>

      <div className="flex justify-center mt-16 mb-32">
        <span onClick={()=>{
         window.history.back();
        }} className="group flex items-center space-x-2 border-black text-sm font-bold bg-yellow text-dark border-dark-05 border-2 hover:border-black px-8 py-4 cursor-pointer">
          <ArrowLeftOutlined className="group-hover:text-base" />
          <div>Volver a donde estaba</div>
        </span>
      </div>

      <Footer />
    </div>
  )
}
