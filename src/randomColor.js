import React from "react"

const RandomColor = ({ msg, cntxt }) => {
  const style = {
    width: "200px",
    height: "200px",
    background: "green",
    border: "1px solid blue"
  }
  console.log("rendered green")
  return <div style={style}></div>
}

export default RandomColor
