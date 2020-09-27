import React from "react"
import Input from "./index"
const rr = require("react-test-renderer")

const render = rr
  .create(<Input value="one" placeholder="two" label="three" />)
  .toJSON()

it("Matches snapshot", () => {
  expect(render).toMatchSnapshot()
})
