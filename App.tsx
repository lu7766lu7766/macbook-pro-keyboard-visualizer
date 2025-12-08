import React, { useEffect, useRef, useState } from "react"
import { MacBookKeyboard } from "./components/MacBookKeyboard"
import { AudioManager } from "./audio"
import { auth } from "firebase-lucid"

export default function App() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())
  const [lastEvent, setLastEvent] = useState<string>("Press any key...")
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.65)
  const audioRef = useRef<AudioManager | null>(null)

  useEffect(() => {
    audioRef.current = new AudioManager()
    audioRef.current.setVolume(volume)
    audioRef.current.setMuted(muted)
  }, [])

  useEffect(() => {
    audioRef.current?.setMuted(muted)
  }, [muted])

  useEffect(() => {
    audioRef.current?.setVolume(volume)
  }, [volume])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser actions for some keys to keep focus in app
      // e.g. preventing F-keys from triggering browser features
      // Note: We can't block everything (like Cmd+W or Cmd+T) safely in a browser environment.
      if (["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Tab", "AltLeft", "AltRight"].includes(e.code)) {
        e.preventDefault()
      }

      setLastEvent(`${e.code} (${e.key})`)
      audioRef.current?.play(e.code)

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

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser] = useState({})
  const register = async () => {
    console.log(
      await auth.register({
        email: registerEmail,
        password: registerPassword,
      })
    )
    alert("Registered!")
  }
  const login = async () => {
    const user = await auth.login({
      email: loginEmail,
      password: loginPassword,
    })
    setUser(user)
    alert("Logged in!")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 mb-4 tracking-tight">
          MacBook Pro
        </h1>
        <div className="mb-4 border border-gray-500 ">
          <div>
            <input className="text-black" type="email" name="" id="" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} /> email
          </div>
          <div>
            <input
              className="text-black"
              type="password"
              name=""
              id=""
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />{" "}
            password
          </div>
          <button onClick={register}>Register</button>
        </div>
        <div className="mb-4 border-[2px] border-gray-600">
          <div>
            <input className="text-black" type="email" name="" id="" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /> email
          </div>
          <div>
            <input className="text-black" type="password" name="" id="" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />{" "}
            password
          </div>
          <button onClick={login}>Login</button>
        </div>
        {JSON.stringify(user)}
        <p className="text-gray-500 font-mono text-sm h-6">{lastEvent}</p>
      </div>

      <div className="transform scale-[0.6] sm:scale-[0.7] md:scale-90 lg:scale-100 transition-transform duration-500">
        {/* <MacBookKeyboard activeKeys={activeKeys} /> */}
      </div>

      <div className="mt-16 text-center text-gray-700 text-xs max-w-md">
        <p>100% SVG rendering. No images. Interactive.</p>
        <p className="mt-2">Try pressing modifier keys, arrows, and function keys.</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 text-gray-200 bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur">
        <button
          onClick={() => setMuted((prev) => !prev)}
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-semibold"
        >
          {muted ? "取消靜音" : "靜音"}
        </button>
        <label className="flex items-center gap-2 text-sm font-mono w-full sm:w-auto">
          <span className="text-gray-400">音量</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-40 accent-gray-200"
          />
          <span className="w-10 text-right">{Math.round(volume * 100)}%</span>
        </label>
      </div>
    </div>
  )
}
