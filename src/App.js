import React, { useRef, useEffect, useCallback } from "react"
import "./App.css"

function App() {
  const canvas = useRef()
  const position = useRef({ x: 10, y: 10 })
  const keys = []
  const moveIncrement = 10
  const characterWidth = 50
  const characterHeight = 50
  const clear = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.clearRect(position.current.x, position.current.y, characterWidth, characterHeight)
  }
  const draw = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.fillRect(position.current.x, position.current.y, characterWidth, characterHeight)
  }

  const handleLeft = useCallback(() => {
    clear()
    if (position.current.x > moveIncrement) {
      position.current.x -= moveIncrement
    } else {
      position.current.x -= position.current.x
    }
    draw()
  }, [])
  const handleRight = useCallback(() => {
    clear()
    if (position.current.x < canvas.current.width - characterWidth) {
      position.current.x += moveIncrement
    }
    draw()
  }, [])
  const handleUp = useCallback(() => {
    clear()
    if (position.current.y > moveIncrement) {
      position.current.y -= moveIncrement
    } else {
      position.current.y -= position.current.y
    }
    draw()
  }, [])
  const handleDown = useCallback(() => {
    clear()
    if (position.current.y < canvas.current.height - characterHeight) {
      position.current.y += moveIncrement
    }
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
