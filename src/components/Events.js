import React, { useState } from "react"
import { Modal } from "antd"
import useSWR from "swr"
import moment from "moment"
const URL = `https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/facebook`
export default () => {
  const { data } = useSWR(URL, url => fetch(url).then(r => r.json()), {
    shouldRetryOnError: false,
    initialData: []
  })
  const [content, setContent] = useState(null)
  const [viewModal, showModal] = useState(false)
  return (
    <div className="flex flex-wrap -m-8 pt-8">
      <Modal
        visible={viewModal}
        footer={null}
        children={
          <div className="flex items-center justify-center flex-col">
            {content}
          </div>
        }
        onCancel={() => showModal(false)}
        closable={false}
      />
      {[...data]
        .splice(0, 4)
        .map(({ end_time, name, description, cover = { source: "" }, id }) => {
          const eventHasPassed = moment(end_time).isBefore(moment())
          const { source } = cover
          return (
            <div
              onClick={() => {
                setContent([
                  <img src={source} alt={name} />,
                  <p
                    style={{ background: "rgba(0,0,0,.03)" }}
                    className="py-3 pl-4 pr-3 mt-3 text-black-50 text-xs"
                  >
                    {description}
                  </p>,
                  <div
                    onClick={() =>
                      window.open(`https://facebook.com/events/${id}`, "_blank")
                    }
                    className="text-center p-3 w-full flex items-center justify-center cursor-pointer border-2 text-lg font-bold hover:bg-yellow hover:text-black hover:border-black"
                  >
                    {eventHasPassed
                      ? `Mirar el ${name}`
                      : `Registrarme al ${name}`}
                  </div>
                ])
                showModal(true)
              }}
              className="w-full sm:w-1/2 cursor-pointer p-2"
            >
              <img
                src={source}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 m-2 border-2 border-black hover:border-4"
              />
              {eventHasPassed ? (
                <div
                  children="Registro cerrado"
                  className="hover:opacity-25 absolute inset-0 bg-black-75 m-2 text-white flex justify-center items-center uppercase text-2xl font-bold"
                />
              ) : null}
            </div>
          )
        })}
    </div>
  )
}
