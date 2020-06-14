import React, { useRef, useEffect, useCallback } from "react"
import "./App.css"

function App() {
  const canvas = useRef()
  const position = useRef({ x: 10, y: 10 })
  const keys = []
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
    position.current.x -= 5
    draw()
  }, [])
  const handleRight = useCallback(() => {
    console.log("right")
    clear()
    position.current.x += 5
    draw()
  }, [])
  const handleUp = useCallback(() => {
    console.log("up")
    clear()
    position.current.y -= 5
    draw()
  }, [])
  const handleDown = useCallback(() => {
    console.log("down")
    clear()
    position.current.y += 5
    draw()
  }, [])
  const handleUpLeft = useCallback(() => {
    clear()
    position.current.y -= 5
    position.current.x -= 5
    draw()
  }, [])
  const handleUpRight = useCallback(() => {
    clear()
    position.current.y -= 5
    position.current.x += 5
    draw()
  }, [])
  const handleDownLeft = useCallback(() => {
    clear()
    position.current.y += 5
    position.current.x -= 5
    draw()
  }, [])
  const handleDownRight = useCallback(() => {
    clear()
    position.current.y += 5
    position.current.x += 5
    draw()
  }, [])

  useEffect(() => {
    const includesKeys = (a, b) => keys.indexOf(a) !== -1 && keys.indexOf(b) !== -1
    draw()
    document.addEventListener("keydown", (e) => {
      console.log("keydown")
      if (keys.indexOf(e.keyCode) === -1) {
        keys.push(e.keyCode)
      }
      if (keys.length > 1) {
        if (includesKeys(38, 37)) {
          return handleUpLeft()
        } else if (includesKeys(38, 39)) {
          return handleUpRight()
        } else if (includesKeys(40, 39)) {
          return handleDownRight()
        } else if (includesKeys(40, 37)) {
          return handleDownLeft()
        }
      } else {
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
      }
    })
    document.addEventListener("keyup", (e) => {
      if (keys.indexOf(e.keyCode) !== -1) {
        const index = keys.indexOf(e.keyCode)
        keys.splice(index, 1)
      }
    })
  }, [
    handleDown,
    handleLeft,
    handleUp,
    handleRight,
    handleDownLeft,
    handleDownRight,
    handleUpLeft,
    handleUpRight,
    keys,
  ])

  return <canvas ref={canvas} width={1000} height={1000} tabIndex={1} />
}

export default App
