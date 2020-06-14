import React, { useRef, useEffect } from "react"
import "./App.css"

function App() {
  const includesKey = (code) => keys.indexOf(code) !== -1
  const canvas = useRef()
  const position = useRef({ x: 10, y: 10 })
  const keys = []
  const character = {
    direction: "left",
    width: 20,
    height: 20,
    moveSpeed: 10,
    attackSpeed: 50,
  }

  document.addEventListener("keyup", (e) => {
    if (keys.indexOf(e.keyCode) !== -1) {
      const index = keys.indexOf(e.keyCode)
      keys.splice(index, 1)
    }
  })

  document.addEventListener("keydown", (e) => {
    console.log(e.keyCode)
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
      includesKey(32) && handleAttack()
    }
  }, 20)

  const clearCharacter = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.clearRect(position.current.x, position.current.y, character.width, character.height)
  }

  const drawCharacter = React.useCallback(() => {
    const ctx = canvas.current.getContext("2d")
    ctx.fillRect(position.current.x, position.current.y, character.width, character.height)
    if (character.direction === "left") {
      ctx.clearRect(position.current.x, position.current.y, 5, 5)
      ctx.clearRect(position.current.x, position.current.y + character.height - 5, 5, 5)
    } else if (character.direction === "up") {
      ctx.clearRect(position.current.x, position.current.y, 5, 5)
      ctx.clearRect(position.current.x + character.width - 5, position.current.y, 5, 5)
    } else if (character.direction === "right") {
      ctx.clearRect(position.current.x + character.width - 5, position.current.y, 5, 5)
      ctx.clearRect(
        position.current.x + character.width - 5,
        position.current.y + character.height - 5,
        5,
        5
      )
    } else if (character.direction === "down") {
      ctx.clearRect(
        position.current.x + character.width - 5,
        position.current.y + character.height - 5,
        5,
        5
      )
      ctx.clearRect(position.current.x, position.current.y + character.height - 5, 5, 5)
    }
  }, [character.width, character.height, character.direction])

  const handleLeft = () => {
    clearCharacter()
    character.direction = "left"
    if (position.current.x > character.moveSpeed) {
      position.current.x -= character.moveSpeed
    } else {
      position.current.x -= position.current.x
    }
    drawCharacter()
  }

  const handleRight = () => {
    character.direction = "right"
    clearCharacter()
    if (position.current.x < canvas.current.width - character.width) {
      position.current.x += character.moveSpeed
    }
    drawCharacter()
  }

  const handleUp = () => {
    character.direction = "up"
    clearCharacter()
    if (position.current.y > character.moveSpeed) {
      position.current.y -= character.moveSpeed
    } else {
      position.current.y -= position.current.y
    }
    drawCharacter()
  }

  const handleDown = () => {
    character.direction = "down"
    clearCharacter()
    if (position.current.y < canvas.current.height - character.height) {
      position.current.y += character.moveSpeed
    }
    drawCharacter()
  }

  const attack = () => {
    setInterval()
  }

  const handleAttack = () => {
    console.log("hit")
    const attackInterval = setInterval(() => {}, character.attackSpeed)
  }

  useEffect(() => {
    drawCharacter()
    return () => clearInterval(interval)
  }, [interval, drawCharacter])

  return <canvas ref={canvas} width={500} height={500} tabIndex={1} />
}

export default App
