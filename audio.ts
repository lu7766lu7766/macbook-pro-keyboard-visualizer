import { KEYBOARD_LAYOUT } from "./constants"

type KeySoundVariant = "light" | "mid" | "deep" | "thock" | "click"

const VARIANT_FREQUENCIES: Record<KeySoundVariant, number> = {
  light: 2400,
  mid: 1800,
  deep: 1200,
  thock: 900,
  click: 2000,
}

// Precompute a map from KeyboardEvent.code to a sound variant.
const codeToVariant: Record<string, KeySoundVariant> = (() => {
  const map: Record<string, KeySoundVariant> = {}

  const assign = (codes: string[], variant: KeySoundVariant) => {
    codes.forEach((code) => {
      map[code] = variant
    })
  }

  // Groupings tuned for audible variety rather than strict realism.
  assign(["Escape", "Backspace", "Enter"], "thock")
  assign(["Tab", "CapsLock"], "deep")
  assign(
    [
      "ShiftLeft",
      "ShiftRight",
      "MetaLeft",
      "MetaRight",
      "ControlLeft",
      "AltLeft",
      "AltRight",
      "Space",
    ],
    "deep",
  )

  assign(
    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Function"],
    "mid",
  )

  assign(
    [
      "Digit0",
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7",
      "Digit8",
      "Digit9",
      "Minus",
      "Equal",
    ],
    "click",
  )

  assign(
    [
      "KeyQ",
      "KeyW",
      "KeyE",
      "KeyR",
      "KeyT",
      "KeyY",
      "KeyU",
      "KeyI",
      "KeyO",
      "KeyP",
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyF",
      "KeyG",
      "KeyH",
      "KeyJ",
      "KeyK",
      "KeyL",
      "KeyZ",
      "KeyX",
      "KeyC",
      "KeyV",
      "KeyB",
      "KeyN",
      "KeyM",
    ],
    "light",
  )

  assign(
    [
      "BracketLeft",
      "BracketRight",
      "Semicolon",
      "Quote",
      "Comma",
      "Period",
      "Slash",
      "Backquote",
      "Backslash",
    ],
    "mid",
  )

  assign(
    [
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
    ],
    "click",
  )

  // Default mapping for any codes not explicitly listed: mid.
  KEYBOARD_LAYOUT.flat().forEach((key) => {
    const codes = Array.isArray(key.code) ? key.code : [key.code]
    codes.forEach((code) => {
      if (!map[code]) {
        map[code] = "mid"
      }
    })
  })

  return map
})()

export class AudioManager {
  private ctx: AudioContext | null = null
  private muted = false
  private volume = 0.6

  private ensureContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {
        /* ignore resume failures */
      })
    }
    return this.ctx
  }

  setMuted(next: boolean) {
    this.muted = next
  }

  setVolume(next: number) {
    this.volume = Math.min(1, Math.max(0, next))
  }

  play(code: string) {
    if (this.muted) return
    const ctx = this.ensureContext()
    const variant = codeToVariant[code] ?? "mid"
    const baseFreq = VARIANT_FREQUENCIES[variant]

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Envelope: quick attack, short decay for a click-like feel.
    const attack = 0.005
    const decay = 0.12
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(this.volume, now + attack)
    gain.gain.exponentialRampToValueAtTime(0.001, now + decay)

    osc.type = "triangle"
    osc.frequency.setValueAtTime(baseFreq, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + decay)

    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + decay + 0.02)
  }
}
