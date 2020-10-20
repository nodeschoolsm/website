import React, {useState} from "react"
import type from "prop-types"



/**
 * The only true button.
 *
 * @version 0.0.1
 * @author [Angel Castillo](https://github.com/x905)
 * @prop {string} className
 * @prop {bool} secondary
 * @prop {string} children
 */
const Button = (props) => {
    const [secondary] = useState( props.secondary)
    const [className] = useState( props.className)
    const [children] = useState( props.children)
    

    return (
        <button className={`text-black font-black text-xl px-6 py-5  ${secondary ?' bg-grey hover:shadow-grey':'bg-yellow hover:shadow-yellow'}  ${className} `}   >
            {children}
        </button>
    )
}



Button.propTypes = {
  
    className: type.string,
  
    children: type.node,

    secondary : type.bool,
    /**
     * Gets called when the user clicks on the button
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {Object} allProps All props of this Button
     */
    onClick : type.func
}

export default Button