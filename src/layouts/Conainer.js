import React from "react"

export default ({ children = null, className = "" }) => {
  return <div className={className}>{children}</div>
}
