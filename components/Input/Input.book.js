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

export const Default = (args) => <Input {...args} />

export const InputDark = (args) => <Input.Dark {...args} />
InputDark.storyName = "Input.Dark"

export const InputLight = (args) => <Input.Light {...args} />
InputLight.storyName = "Input.Light"
InputLight.parameters = {
  backgrounds: { default: "dark" }
}

export const WithLabel = (args) => <Input label="Custom label" {...args} />

export const WithPlaceholder = (args) => (
  <Input placeholder="Escribe Átomico" {...args} />
)

export const LightWithLabelAndPlaceholder = (args) => (
  <Input.Light placeholder="123-321" label="Sup!" {...args} />
)
LightWithLabelAndPlaceholder.parameters = {
  backgrounds: { default: "dark" }
}
