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

export const WithLabel = (args) => <Input label="Custom label" {...args} />

export const WithPlaceholder = (args) => (
  <Input placeholder="Escribe Átomico" {...args} />
)

export const DarkWithLabelAndPlaceholder = (args) => <Input.Dark placeholder="123-321" label="Sup!" {...args} />
DarkWithLabelAndPlaceholder.parameters = {
  backgrounds: { default: "dark" }
}
