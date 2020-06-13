import React, { useRef, useEffect, useState } from "react"
import "./App.css"

function App() {
  const canvas = useRef()
  const position = useRef(10)

  const handleMove = (e) => {
    const position = {
      x: 10,
      y: 10
    }
    const handleRight = () => {
      console.log("handling right")
      position.x += 1
    }
    const handleUp = () => postion.y += 1
    const handleLeft = () => position.x -= 1
    const handleDown = () => position.y -= 1

    switch (e.keyCode) {
      case 37:
        handleLeft()
        break
      case 38:
        handleUp()
        break
      case 39:
        handleRight()
        break
      case 40:
        handleDown()
        break
      default:
        return
    }

    return position
  }

  const renderCharacter = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.fillRect(, posY, 50, 50)
  }

  useEffect(() => {
    renderCharacter()
    document.addEventListener("keydown", handleMove)
  }, [])

  return <canvas ref={canvas} width={500} height={500} tabIndex={1} />
}

export default App
