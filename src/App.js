import React from "react"
import RandomColor from "./randomColor"
import RandomColor2 from "./RandomColor2"
import RandomColor3 from "./RandomColor3"
import "./App.css"
import { useSetRCValues } from "./context"

function App() {
  console.log("app rendered")
  const setRC = useSetRCValues()

  return (
    <div className='App'>
      <RandomColor />
      <RandomColor2 />
      <RandomColor3 />
      <button style={{ position: "absolute", top: 0 }} onClick={() => setRC(Math.random())}>
        click me
      </button>
    </div>
  )
}

export default App
