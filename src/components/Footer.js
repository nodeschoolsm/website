import React from "react"
import Facebook from "../assets/facebook.component.svg"
import Twitter from "../assets/twitter.component.svg"
import Instagram from "../assets/instagram.component.svg"
import Linkedin from "../assets/linkedin.component.svg"
import Slack from "../assets/slack.component.svg"
import { css } from "emotion"
const open = url => window.open(url, "_blank")
const LINKS = [
  {
    name: "Blog",
    link: "http://blog.nodeschoolsm.io"
  },
  {
    name: "Noder's Guide",
    link:
      "https://www.notion.so/nodeschoolsm/Noder-s-Guide-12f609c1e9b64a58b93769c808f5cfeb"
  },
  {
    name: "Organizadores",
    link: "http://org.nodeschoolsm.io"
  },
  {
    name: "Código de conducta",
    link:
      "https://www.notion.so/nodeschoolsm/C-digo-de-conducta-bd45d87db2244bd09dc187e699cd08bb"
  },
  { name: "Patrocinar", link: "http://why.nodeschoolsm.io" }
]
export default () => {
  return (
    <div className="w-full">
      <div
        className="p-12 md:p-24 flex flex-col sm:flex-row"
        style={{ background: "#323330" }}
      >
        <div className="flex flex-col">
          {LINKS.map(({ name, link }) => {
            return (
              <span
                onClick={() => open(link, "_blank")}
                className="inline text-white-50 text-lg my-2 cursor-pointer hover:text-white"
              >
                {name}
              </span>
            )
          })}
        </div>
        <div
          className={
            "flex-grow flex items-end justify-end pt-6 md:pt-0 " +
            css`
              & > *:hover {
                cursor: pointer;
                animation: tada 0.8s;
              }
            `
          }
        >
          <Twitter
            onClick={() => open("https://twitter.com/nodeschoolsm")}
            fill="white"
            width="29px"
            style={{ margin: "4px 0" }}
          />
          <Linkedin
            onClick={() =>
              open("https://www.linkedin.com/company/nodeschool-san-miguel")
            }
            fill="white"
            width="29px"
            style={{ margin: "4px 0" }}
          />
          <Slack
            onClick={() => open("http://slack.nodeschoolsm.io")}
            fill="white"
            width="28px"
            style={{ margin: "4px 0" }}
          />
          <Instagram
            onClick={() => open("https://www.instagram.com/nodeschoolsm/")}
            fill="white"
            width="29px"
            style={{ margin: "4px 0" }}
          />
          <Facebook
            onClick={() => open("https://www.facebook.com/nodeschoolsm")}
            fill="white"
            width="29px"
            style={{ margin: "4px 0" }}
          />
        </div>
      </div>
      <div
        className="flex  justify-center items-center px-4 py-5 font-semibold text-lg text-black"
        style={{ background: "#BBBCBB" }}
      >
        Nodeschool San Miguel
      </div>
    </div>
  )
}
