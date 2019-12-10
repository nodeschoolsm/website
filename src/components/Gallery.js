import React, { useState } from "react"
import { Modal } from "antd"
import { css } from "emotion"
export default ({ photos = [] }) => {
  const [image, setImage] = useState("")
  const [viewModal, showModal] = useState(false)
  return (
    <div className="flex flex-wrap -m-8 py-20 md:py-0">
      <Modal
        visible={viewModal}
        footer={null}
        children={
          <div className="flex flex-col items-center justify-center">
            <img src={image} />
            <a children="Mirar album completo" href="https://www.meetup.com/nodeschoolsm/photos/" target="_blank" className="pt-4"/>
          </div>
        }
        onCancel={() => showModal(false)}
        closable={false}
      />
      {photos.map(photo => {
        return (
          <div
            onClick={() => {
              setImage(photo)
              showModal(true)
            }}
            className="w-full sm:w-1/2 lg:w-1/3 flex items-center justify-center h-64 overflow-hidden"
          >
            <img
              src={photo}
              alt="cargando..."
              className={
                "object-cover w-full h-full cursor-pointer " +
                css`
                  &:hover {
                    transform: scale(1.2);
                    transition: all 0.1s ease-in-out;
                  }
                `
              }
            />
          </div>
        )
      })}
    </div>
  )
}
