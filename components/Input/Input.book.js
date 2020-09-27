import React from "react"
import Input from "./index"
import page from "./docs.mdx"

export default {
  title: "Input",
  parameters: {
    docs: {
      page
    },
    backgrounds: {
      values: [{ name: "dark", value: "#000" }]
    }
  },
  component: Input,
  argTypes: { onChange: { action: "onChange" } }
}

export const Light = (args) => <Input {...args} />

export const Dark = (args) => <Input.Dark {...args} />
Dark.parameters = {
  backgrounds: { default: "dark" }
}

export const InputLight = (args) => <Input.Light {...args} />
InputLight.storyName = "Input.Light"

export const InputDark = (args) => <Input.Dark {...args} />
InputDark.storyName = "Input.Dark"
InputDark.parameters = {
  backgrounds: { default: "dark" }
}
