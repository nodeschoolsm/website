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
          <div className="flex h-16 w-1/2">
            <div
              className="flex items-center pr-2"
              style={{ minWidth: "10rem" }}
            >
              <img src={pic} alt={title} style={{ width: "6rem" }} />
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <div className="text-xl font-bold">{title}</div>
              <div>{description}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
