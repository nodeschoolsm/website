import React from "react"
import {
  ArrowUpOutlined,
  InstagramOutlined,
  GithubOutlined,
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
} from "@ant-design/icons"
export default ({ className = "" }) => {
  return (
    <>
      <div
        className={`bg-black text-white px-6 pb-12 flex flex-col items-center ${className}`}
      >
        <div className="flex justify-between text-sm sm:text-xs w-full max-w-3xl my-8 flex-wrap sm:flex-no-wrap">
          {[
            "Home",
            "Código de conducta",
            "FAQ",
            "Mentions",
            "Organizadores",
            "Merch",
          ].map((text, index) => {
            return [
              index ? <i className="hidden sm:block">•</i> : null,
              <a
                href="#"
                className="w-full my-1 sm:m-0 sm:w-auto mx-1 text-white uppercase"
              >
                {text}
              </a>,
            ]
          })}
        </div>
        <div className="w-11/12 xl:w-6/12 border-t border-light-10" />
        <div className="flex w-11/12 xl:w-6/12 text-base mt-4 mb-6 justify-end">
          <LinkedinFilled />
          <div className="mx-1"></div>
          <InstagramOutlined />
          <div className="mx-1"></div>
          <TwitterOutlined />
          <div className="mx-1"></div>
          <FacebookFilled />
          <div className="mx-1"></div>
          <GithubOutlined />
        </div>
      </div>
      <div className="bg-black flex items-end">
        <div className="sm:w-20 h-20" />
        <div className="flex-grow justify-center flex items-end">
          <img
            className="h-16 sm:h-20"
            src={require("../assets/image/OKC - light.png")}
            alt=""
          />
          <div className="h-20 bg-light-05 mx-4 w-1px"></div>
          <img
            className="h-16 sm:h-20"
            src={require("../assets/image/OKC-L.png")}
            alt=""
          />
        </div>

        <div
          onClick={() => {
            document.querySelector("[class*=overflow]").scrollTop = 0
          }}
          className="w-20 h-20 cursor-pointer hover:bg-light-90 bg-white hidden sm:flex items-center justify-center"
        >
          <ArrowUpOutlined className="text-2xl" />
        </div>
      </div>
    </>
  )
}
