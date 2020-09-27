import React from "react"
import type from "prop-types"
const Button = ({ className = "font-bold" }) => {
  return <b className={`bg-black text-white p-4 font-poppins ${className}`}>👋 Hola</b>
}
Button.propTypes = {
  className: type.string
}
export default Button
