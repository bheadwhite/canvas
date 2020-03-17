import React, { createContext, useState, useContext } from "react"

const RandomColorContext = createContext()
const SetRandomColorContext = createContext()

const RandomColorProvider = ({ children }) => {
  const [number, setNumber] = useState(1)
  console.log("current number in provider is:", number)

  return (
    <RandomColorContext.Provider value={number}>
      <SetRandomColorContext.Provider value={setNumber}>{children}</SetRandomColorContext.Provider>
    </RandomColorContext.Provider>
  )
}
const useRCValues = () => useContext(RandomColorContext)
const useSetRCValues = () => useContext(SetRandomColorContext)

export { RandomColorProvider, useRCValues, useSetRCValues }
