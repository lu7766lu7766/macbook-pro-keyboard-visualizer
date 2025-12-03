import React, { useEffect, useState } from "react"
import { MacBookKeyboard } from "./components/MacBookKeyboard"

export default function App() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())
  const [lastEvent, setLastEvent] = useState<string>("Press any key...")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser actions for some keys to keep focus in app
      // e.g. preventing F-keys from triggering browser features
      // Note: We can't block everything (like Cmd+W or Cmd+T) safely in a browser environment.
      if (["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Tab", "AltLeft", "AltRight"].includes(e.code)) {
        e.preventDefault()
      }

      setLastEvent(`${e.code} (${e.key})`)

      setActiveKeys((prev) => {
        const newSet = new Set(prev)
        newSet.add(e.code)
        return newSet
      })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKeys((prev) => {
        const newSet = new Set(prev)
        newSet.delete(e.code)
        return newSet
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 mb-4 tracking-tight">
          MacBook Pro
        </h1>
        <p className="text-gray-500 font-mono text-sm h-6">{lastEvent}</p>
      </div>

      <div className="transform scale-[0.6] sm:scale-[0.7] md:scale-90 lg:scale-100 transition-transform duration-500">
        <MacBookKeyboard activeKeys={activeKeys} />
      </div>

      <div className="mt-16 text-center text-gray-700 text-xs max-w-md">
        <p>100% SVG rendering. No images. Interactive.</p>
        <p className="mt-2">Try pressing modifier keys, arrows, and function keys.</p>
      </div>
    </div>
  )
}
