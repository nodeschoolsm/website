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
      {data.map(({ title, pic, description }) => {
        return (
          <div className="flex h-24 md:h-16 w-full lg:w-1/2 p-2">
            <div
              className="flex items-center pr-2"
              style={{ minWidth: "10rem" }}
            >
              <img src={pic} alt={title} style={{ width: "6rem" }} />
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <div className="xl:text-xl font-bold">{title}</div>
              <div className="text-sm xl:text-base">{description}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
