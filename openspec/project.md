# Project Context

## Purpose
High-fidelity, interactive visualization of a MacBook Pro ANSI keyboard. Renders the full keyboard in SVG and highlights keys in real time based on actual `KeyboardEvent.code` inputs for demos, teaching, and debugging key mappings.

## Tech Stack
- React 19 + TypeScript on Vite 6
- SVG rendering for the keyboard; no canvas or images
- Tailwind utility classes via CDN plus minimal inline styles; Inter font from Google Fonts CDN
- Node.js toolchain (npm scripts) for local dev/build

## Project Conventions

### Code Style
- Functional React components with hooks; data passed top-down (e.g., `activeKeys` state lives in `App`)
- TypeScript types for props and layout data (`KeyData`, `KeyProps`); prefer explicit interfaces
- Layout is data-driven from `KEYBOARD_LAYOUT` constants; uppercase constant names
- Utility-first styling with Tailwind classes in JSX; no local CSS pipeline beyond CDN
- Path alias `@/*` resolves to project root

### Architecture Patterns
- Single-page Vite app; `App` listens to keydown/keyup and tracks pressed codes
- `MacBookKeyboard` renders the chassis SVG and iterates the layout grid
- `Key` component renders individual SVG keys with labels/icons and active-state visuals
- Icons isolated in `components/Icons.tsx`; layout defined in `constants.tsx`
- Layout uses ANSI MacBook Pro sizing (unit + gap model) with special handling for stacked arrows

### Testing Strategy
- No automated tests yet; manual verification via `npm run dev` and pressing keys
- If adding tests, prefer Vitest + React Testing Library to cover event handling and rendering

### Git Workflow
- Default to feature branches off `main`, small focused commits, and PRs for review
- No enforced commit convention; keep messages clear about scope/intent

## Domain Context
- Keyboard state is tracked by `KeyboardEvent.code`; some physical keys share codes (handled via array for certain keys)
- Prevents default browser actions for function keys and some modifiers but cannot block OS-level combos (e.g., Cmd+W)
- Arrow keys use stacked rendering: up/down share a column, positioned via offsets in layout data
- Touch ID/power and caps lock use icons; caps shows a green indicator when active

## Important Constraints
- Fully client-side; no backend or persistence
- Depends on live keyboard events, so browser window must have focus; OS/global shortcuts may still trigger
- Tailwind and fonts are pulled from CDNs at runtime (network required on first load)
- Vite exposes `GEMINI_API_KEY` env values but the app does not currently call external APIs

## External Dependencies
- React/ReactDOM (npm deps; import map also points to `https://aistudiocdn.com`)
- Tailwind CDN for utility classes; Google Fonts CDN for Inter
- Vite dev server/build toolchain; Node.js/npm for scripts
