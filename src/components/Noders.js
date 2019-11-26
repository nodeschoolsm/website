import React, { useState, useEffect } from "react"
import useSWR from "swr"

const URL = "https://api.meetup.com/nodeschoolsm/members"

export default () => {
  const { data, error } = useSWR(URL, fetch)
  console.log(data, error)

  return <div></div>
}
