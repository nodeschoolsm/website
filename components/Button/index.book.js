import React from "react"
import page from "./docs.mdx"
import Button from "./index"
export default {
  title: "Button",
  parameters: {
    docs: {
      page
    }
  },
  component: Button
}
export const Primary = (args) => <Button {...args} />
