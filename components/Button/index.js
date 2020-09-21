import React from "react"
import type from "prop-types"
const Button = ({ className = "font-bold" }) => {
  return (
    <button className={`bg-yellow font-poppins ${className}`}>
      Am a button
    </button>
  )
}
Button.propTypes = {
  className: type.string
}
export default Button
