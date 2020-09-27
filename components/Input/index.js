import React from "react"
import types from "prop-types"
/**
 * @typedef Input
 * @property { (text: String) => null } onChange - onChange handler callbacks with `.value`
 * @property { String } className - Extra className for <input/>
 * @property { String } labelClassName - Extra className for label
 * @property { String } containerClassName - Extra className for input container
 * @property { String? } value - Controlled component value
 */
const propTypes = {
  className: types.string,
  labelClassName: types.string,
  containerClassName: types.string,
  onChange: types.func,
  value: types.string
}
const Template = ({
  className = "",
  labelClassName = "",
  containerClassName = "",
  onChange = () => null,
  value = undefined,
  theme
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      <div className={`text-xs font-poppins ${theme.label} ${labelClassName}`}>
        Digita algo
      </div>
      <input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digita algo..."
        type="text"
        value={value}
        className={`${theme.input} bg-transparent font-poppins border-b-2 px-4 py-2 w-full ${className}`}
      />
    </div>
  )
}
Template.propTypes = {
  ...propTypes,
  theme: types.shape({
    label: types.string,
    input: types.string
  }).isRequired
}

/**
 * Light flavor Input
 * @param { Input } props
 */
function Light(props) {
  return (
    <Template
      {...props}
      theme={{
        label: "text-black",
        input: "border-dark-15"
      }}
    />
  )
}
/**
 * Dark flavor Input
 * @param { Input } props
 */
function Dark(props) {
  return (
    <Template
      {...props}
      theme={{
        label: "text-white",
        input: "border-light-15 text-white"
      }}
    />
  )
}
/**
 * Light flavor Input
 * @param { Input } props
 */
function Input(props) {
  return <Light {...props} />
}

Input.Light = Light
Input.Dark = Dark
Input.propTypes = propTypes
export default Input
