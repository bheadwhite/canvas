import React, { useRef, useEffect } from "react"
import "./App.css"

function App() {
  const includesKey = (code) => keys.indexOf(code) !== -1
  const canvas = useRef()
  const characterPosition = useRef({ x: 10, y: 10 })
  const weaponPosition = useRef({ x: null, y: null, intervals: [] })
  const keys = []
  const character = {
    direction: "left",
    width: 25,
    height: 25,
    moveSpeed: 10,
    attackSpeed: 300,
    weapon: "bow",
  }

  document.addEventListener("keyup", (e) => {
    if (keys.indexOf(e.keyCode) !== -1) {
      const index = keys.indexOf(e.keyCode)
      keys.splice(index, 1)
    }
  })

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
      includesKey(32) && handleAttack()
    }
  }, 20)

  const attackInterval = () => {
    const id = setInterval(() => {
      const ctx = canvas.current.getContext("2d")
      if (character.weapon === "bow") {
        const centerX = character.width / 2
        const centerY = character.height / 2
        if (weaponPosition.current.x == null) {
          // weaponPosition.current.x = characterPosition.x + centerX
          // weaponPosition.current.y = characterPosition.y + centerY
          weaponPosition.current.x = 0
          weaponPosition.current.y = 0
        }
        //initial fill
        ctx.fillRect(weaponPosition.current.x, weaponPosition.current.y, centerX, centerY)
      }
      if (
        weaponPosition.current.x + character.width < canvas.current.width &&
        weaponPosition.current.y + character.height < canvas.current.height &&
        weaponPosition.current.x >= 0 &&
        weaponPosition.current.y >= 0
      ) {
        weaponPosition.current.x += 15
      } else {
        weaponPosition.current.x = 0
        clearInterval(id)
      }
    }, character.attackSpeed)
    // weaponPosition.current.intervals.push(id)
  }

  const clearCharacter = () => {
    const ctx = canvas.current.getContext("2d")
    ctx.clearRect(
      characterPosition.current.x,
      characterPosition.current.y,
      character.width,
      character.height
    )
  }

  const drawCharacter = React.useCallback(() => {
    const ctx = canvas.current.getContext("2d")
    const clearTopLeft = () =>
      ctx.clearRect(characterPosition.current.x, characterPosition.current.y, 5, 5)
    const clearTopRight = () =>
      ctx.clearRect(
        characterPosition.current.x + character.width - 5,
        characterPosition.current.y,
        5,
        5
      )
    const clearBottomLeft = () =>
      ctx.clearRect(
        characterPosition.current.x,
        characterPosition.current.y + character.height - 5,
        5,
        5
      )
    const clearBottomRight = () =>
      ctx.clearRect(
        characterPosition.current.x + character.width - 5,
        characterPosition.current.y + character.height - 5,
        5,
        5
      )
    ctx.fillRect(
      characterPosition.current.x,
      characterPosition.current.y,
      character.width,
      character.height
    )
    if (character.direction === "left") {
      clearTopLeft()
      clearBottomLeft()
    } else if (character.direction === "up") {
      clearTopLeft()
      clearTopRight()
    } else if (character.direction === "right") {
      clearTopRight()
      clearBottomRight()
    } else if (character.direction === "down") {
      clearBottomLeft()
      clearBottomRight()
    }
  }, [character.width, character.height, character.direction])

  const handleLeft = () => {
    clearCharacter()
    character.direction = "left"
    if (characterPosition.current.x > character.moveSpeed) {
      characterPosition.current.x -= character.moveSpeed
    } else {
      characterPosition.current.x -= characterPosition.current.x
    }
    drawCharacter()
  }

  const handleRight = () => {
    character.direction = "right"
    clearCharacter()
    if (characterPosition.current.x < canvas.current.width - character.width) {
      characterPosition.current.x += character.moveSpeed
    }
    drawCharacter()
  }

  const handleUp = () => {
    character.direction = "up"
    clearCharacter()
    if (characterPosition.current.y > character.moveSpeed) {
      characterPosition.current.y -= character.moveSpeed
    } else {
      characterPosition.current.y -= characterPosition.current.y
    }
    drawCharacter()
  }

  const handleDown = () => {
    character.direction = "down"
    clearCharacter()
    if (characterPosition.current.y < canvas.current.height - character.height) {
      characterPosition.current.y += character.moveSpeed
    }
    drawCharacter()
  }

  const handleAttack = () => {
    attackInterval()

    // clearInterval(attackInterval)
  }

  useEffect(() => {
    drawCharacter()
    return () => clearInterval(interval)
  }, [interval, drawCharacter])

  return <canvas ref={canvas} width={500} height={500} tabIndex={1} />
}

export default App
