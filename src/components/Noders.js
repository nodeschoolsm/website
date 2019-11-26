import React from "react"

export default ({ noders = [] }) => {
  return (
    <div onClick={()=> window.open("https://www.meetup.com/nodeschoolsm/members/","_blank")} className="cursor-pointer w-full flex-wrap flex items-center justify-center">
      {noders.map(({ name, pic }) => {
        return <img src={pic} alt={name} className="w-16 h-16" title={name} />
      })}
    </div>
  )
}
