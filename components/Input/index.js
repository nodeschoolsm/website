import React from "react"
import types from "prop-types"
/**
 * @typedef Input
 * @property { (text: String) => null } onChange - onChange handler callbacks with `.value`
 * @property { String } label - The input label, defaults to "Digita algo"
 * @property { String } className - Extra className for <input/>
 * @property { String } labelClassName - Extra className for label
 * @property { String } containerClassName - Extra className for input container
 * @property { String? } value - Controlled component value
 */
const propTypes = {
  label: types.string,
  placeholder: types.string,
  className: types.string,
  labelClassName: types.string,
  containerClassName: types.string,
  onChange: types.func,
  value: types.string
}
const Template = ({
  label = "Digita algo",
  placeholder = "Digita algo...",
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
        {label}
      </div>
      <input
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
Light.propTypes = propTypes

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
Dark.propTypes = propTypes

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
