import React from "react"
import page from "./docs.mdx"
import ExampleComponent from "./index"
export default {
  title: "ExampleComponent",
  parameters: {
    docs: {
      page
    }
  },
  component: ExampleComponent
}
export const AnExampleComponent = (args) => <ExampleComponent {...args} />
