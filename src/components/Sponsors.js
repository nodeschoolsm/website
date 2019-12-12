import React from "react"
import useSWR from "swr"
const URL = `https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/sponsors`
export default () => {
  const { data } = useSWR(URL, url => fetch(url).then(r => r.json()), {
    shouldRetryOnError: false,
    initialData: []
  })

  return (
    <div className="flex flex-wrap w-full">
      {data.map(({ title, pic, description, link = "#" }) => {
        return (
          <div className="flex w-full lg:w-1/2 p-2">
            <div
              onClick={() => window.open(link, "_blank")}
              className="flex p-4 w-full justify-center items-center shadow hover:shadow-md cursor-pointer"
            >
              <div
                className="pr-4 flex items-center"
                style={{ maxHeight: "3rem", maxWidth: "6rem" }}
              >
                <img
                  src={pic}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain"
                  }}
                />
              </div>
              <div className="flex flex-col justify-center flex-grow lg:text-center">
                <div className="xl:text-xl font-bold">{title}</div>
                <div className="text-sm xl:text-base">{description}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
