import React, { useRef, useEffect, useCallback } from "react"
import "./App.css"

function App() {
  const canvas = useRef()
  const position = useRef({ x: 10, y: 10 })
  const keys = []
  const moveIncrement = 10
  const clear = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.clearRect(position.current.x, position.current.y, 50, 50)
  }
  const draw = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.fillRect(position.current.x, position.current.y, 50, 50)
  }

  const handleLeft = useCallback(() => {
    console.log("left")
    clear()
    position.current.x -= moveIncrement
    draw()
  }, [])
  const handleRight = useCallback(() => {
    console.log("right")
    clear()
    position.current.x += moveIncrement
    draw()
  }, [])
  const handleUp = useCallback(() => {
    console.log("up")
    clear()
    position.current.y -= moveIncrement
    draw()
  }, [])
  const handleDown = useCallback(() => {
    console.log("down")
    clear()
    position.current.y += moveIncrement
    draw()
  }, [])

  useEffect(() => {
    const includesKey = (code) => keys.indexOf(code) !== -1
    console.log(keys)
    draw()
    document.addEventListener("keydown", (e) => {
      if (keys.indexOf(e.keyCode) === -1) {
        keys.push(e.keyCode)
      }
    })
    const interval = setInterval(() => {
      if (keys.length > 0) {
        includesKey(37) && handleLeft()
        includesKey(38) && handleUp()
        includesKey(39) && handleRight()
        includesKey(40) && handleDown()
      }
    }, 20)

    document.addEventListener("keyup", (e) => {
      if (keys.indexOf(e.keyCode) !== -1) {
        const index = keys.indexOf(e.keyCode)
        keys.splice(index, 1)
      }
    })
  }, [keys])

  return <canvas ref={canvas} width={1000} height={1000} tabIndex={1} />
}

export default App
