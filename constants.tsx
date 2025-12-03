import React from 'react';
import { KeyData } from './types';
import * as Icons from './components/Icons';

// ANSI Layout for MacBook Pro (14"/16" M-series style)
export const KEYBOARD_LAYOUT: KeyData[][] = [
  // Row 0: Function Keys
  [
    { id: 'esc', label: 'esc', width: 1.6, code: 'Escape', fontSize: 'xs', alignment: 'bottom-left' },
    { id: 'f1', icon: <Icons.IconBrightnessDown />, subLabel: 'F1', width: 1, code: 'F1', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f2', icon: <Icons.IconBrightnessUp />, subLabel: 'F2', width: 1, code: 'F2', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f3', icon: <Icons.IconPlayPause />, subLabel: 'F3', width: 1, code: 'F3', fontSize: 'xs', alignment: 'bottom-right' }, // Approximating Exposé/Dictation as Generic
    { id: 'f4', icon: <Icons.IconSearch />, subLabel: 'F4', width: 1, code: 'F4', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f5', icon: <Icons.IconMic />, subLabel: 'F5', width: 1, code: 'F5', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f6', icon: <Icons.IconMoon />, subLabel: 'F6', width: 1, code: 'F6', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f7', icon: <Icons.IconArrowLeft />, subLabel: 'F7', width: 1, code: 'F7', fontSize: 'xs', alignment: 'bottom-right' }, // Rewind
    { id: 'f8', icon: <Icons.IconPlayPause />, subLabel: 'F8', width: 1, code: 'F8', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f9', icon: <Icons.IconArrowRight />, subLabel: 'F9', width: 1, code: 'F9', fontSize: 'xs', alignment: 'bottom-right' }, // Fast Fwd
    { id: 'f10', icon: <Icons.IconVolumeMute />, subLabel: 'F10', width: 1, code: 'F10', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f11', icon: <Icons.IconVolumeDown />, subLabel: 'F11', width: 1, code: 'F11', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'f12', icon: <Icons.IconVolumeUp />, subLabel: 'F12', width: 1, code: 'F12', fontSize: 'xs', alignment: 'bottom-right' },
    { id: 'touchid', icon: <Icons.IconTouchID />, width: 1, code: 'Power', type: 'special' }, // Power/TouchID
  ],
  // Row 1: Numbers
  [
    { id: 'backquote', label: '`', subLabel: '~', width: 1, code: 'Backquote' },
    { id: '1', label: '1', subLabel: '!', width: 1, code: 'Digit1' },
    { id: '2', label: '2', subLabel: '@', width: 1, code: 'Digit2' },
    { id: '3', label: '3', subLabel: '#', width: 1, code: 'Digit3' },
    { id: '4', label: '4', subLabel: '$', width: 1, code: 'Digit4' },
    { id: '5', label: '5', subLabel: '%', width: 1, code: 'Digit5' },
    { id: '6', label: '6', subLabel: '^', width: 1, code: 'Digit6' },
    { id: '7', label: '7', subLabel: '&', width: 1, code: 'Digit7' },
    { id: '8', label: '8', subLabel: '*', width: 1, code: 'Digit8' },
    { id: '9', label: '9', subLabel: '(', width: 1, code: 'Digit9' },
    { id: '0', label: '0', subLabel: ')', width: 1, code: 'Digit0' },
    { id: 'minus', label: '-', subLabel: '_', width: 1, code: 'Minus' },
    { id: 'equal', label: '=', subLabel: '+', width: 1, code: 'Equal' },
    { id: 'delete', label: 'delete', width: 1.6, code: 'Backspace', alignment: 'bottom-right', fontSize: 'sm' },
  ],
  // Row 2: Tab + QWERTY
  [
    { id: 'tab', label: 'tab', width: 1.6, code: 'Tab', alignment: 'bottom-left', fontSize: 'sm' },
    { id: 'q', label: 'Q', width: 1, code: 'KeyQ' },
    { id: 'w', label: 'W', width: 1, code: 'KeyW' },
    { id: 'e', label: 'E', width: 1, code: 'KeyE' },
    { id: 'r', label: 'R', width: 1, code: 'KeyR' },
    { id: 't', label: 'T', width: 1, code: 'KeyT' },
    { id: 'y', label: 'Y', width: 1, code: 'KeyY' },
    { id: 'u', label: 'U', width: 1, code: 'KeyU' },
    { id: 'i', label: 'I', width: 1, code: 'KeyI' },
    { id: 'o', label: 'O', width: 1, code: 'KeyO' },
    { id: 'p', label: 'P', width: 1, code: 'KeyP' },
    { id: 'bracketLeft', label: '[', subLabel: '{', width: 1, code: 'BracketLeft' },
    { id: 'bracketRight', label: ']', subLabel: '}', width: 1, code: 'BracketRight' },
    { id: 'backslash', label: '\\', subLabel: '|', width: 1, code: 'Backslash' },
  ],
  // Row 3: Caps + ASDF
  [
    { id: 'caps', label: 'caps lock', icon: <Icons.IconCaps />, width: 1.9, code: 'CapsLock', alignment: 'bottom-left', fontSize: 'xs' }, // Custom alignment for circle indicator
    { id: 'a', label: 'A', width: 1, code: 'KeyA' },
    { id: 's', label: 'S', width: 1, code: 'KeyS' },
    { id: 'd', label: 'D', width: 1, code: 'KeyD' },
    { id: 'f', label: 'F', width: 1, code: 'KeyF' },
    { id: 'g', label: 'G', width: 1, code: 'KeyG' },
    { id: 'h', label: 'H', width: 1, code: 'KeyH' },
    { id: 'j', label: 'J', width: 1, code: 'KeyJ' },
    { id: 'k', label: 'K', width: 1, code: 'KeyK' },
    { id: 'l', label: 'L', width: 1, code: 'KeyL' },
    { id: 'semicolon', label: ';', subLabel: ':', width: 1, code: 'Semicolon' },
    { id: 'quote', label: "'", subLabel: '"', width: 1, code: 'Quote' },
    { id: 'enter', label: 'return', width: 1.7, code: 'Enter', alignment: 'bottom-right', fontSize: 'sm' },
  ],
  // Row 4: Shift + ZXCV
  [
    { id: 'shiftLeft', label: 'shift', icon: <Icons.IconShift />, width: 2.4, code: 'ShiftLeft', alignment: 'bottom-left', fontSize: 'sm' },
    { id: 'z', label: 'Z', width: 1, code: 'KeyZ' },
    { id: 'x', label: 'X', width: 1, code: 'KeyX' },
    { id: 'c', label: 'C', width: 1, code: 'KeyC' },
    { id: 'v', label: 'V', width: 1, code: 'KeyV' },
    { id: 'b', label: 'B', width: 1, code: 'KeyB' },
    { id: 'n', label: 'N', width: 1, code: 'KeyN' },
    { id: 'm', label: 'M', width: 1, code: 'KeyM' },
    { id: 'comma', label: ',', subLabel: '<', width: 1, code: 'Comma' },
    { id: 'period', label: '.', subLabel: '>', width: 1, code: 'Period' },
    { id: 'slash', label: '/', subLabel: '?', width: 1, code: 'Slash' },
    { id: 'shiftRight', label: 'shift', icon: <Icons.IconShift />, width: 2.2, code: 'ShiftRight', alignment: 'bottom-right', fontSize: 'sm' },
  ],
  // Row 5: Modifiers + Space + Arrows
  [
    { id: 'fn', label: 'fn', icon: <Icons.IconPlayPause />, width: 1, code: 'Function', alignment: 'bottom-left', fontSize: 'sm' }, // Globe icon usually
    { id: 'ctrl', icon: <Icons.IconControl />, label: 'control', width: 1, code: 'ControlLeft', alignment: 'bottom-right', fontSize: 'sm' },
    { id: 'optLeft', icon: <Icons.IconOption />, label: 'option', width: 1, code: 'AltLeft', alignment: 'bottom-right', fontSize: 'sm' },
    { id: 'cmdLeft', icon: <Icons.IconCommand />, label: 'command', width: 1.25, code: 'MetaLeft', alignment: 'bottom-right', fontSize: 'sm' },
    { id: 'space', width: 5.15, code: 'Space' },
    { id: 'cmdRight', icon: <Icons.IconCommand />, label: 'command', width: 1.25, code: 'MetaRight', alignment: 'bottom-left', fontSize: 'sm' },
    { id: 'optRight', icon: <Icons.IconOption />, label: 'option', width: 1, code: 'AltRight', alignment: 'bottom-left', fontSize: 'sm' },
    { id: 'arrowLeft', icon: <Icons.IconArrowLeft />, width: 1, code: 'ArrowLeft' },
    { id: 'arrowUp', icon: <Icons.IconArrowUp />, width: 1, height: 0.5, code: 'ArrowUp' }, // Special height
    { id: 'arrowDown', icon: <Icons.IconArrowDown />, width: 1, height: 0.5, code: 'ArrowDown', y: 0.5 }, // Special Y offset
    { id: 'arrowRight', icon: <Icons.IconArrowRight />, width: 1, code: 'ArrowRight' },
  ],
];
