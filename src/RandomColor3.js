import React from "react"
import { useRCValues } from "./context"

const RandomColor = ({ msg, cntxt }) => {
  const RC = useRCValues()
  const style = {
    width: "200px",
    height: "200px",
    background: "red",
    border: "1px solid blue"
  }

  console.log("rendered red")
  return <div style={style}>{RC}</div>
}

export default RandomColor
