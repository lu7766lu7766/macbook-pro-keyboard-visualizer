import React from 'react';
import { KEYBOARD_LAYOUT } from '../constants';
import { Key } from './Key';

interface MacBookKeyboardProps {
  activeKeys: Set<string>;
}

export const MacBookKeyboard: React.FC<MacBookKeyboardProps> = ({ activeKeys }) => {
  const UNIT_SIZE = 50; // Pixels per unit
  const GAP = 6; // Pixels between keys
  const PADDING = 10; // Chassis padding inside the inset
  
  // Calculate total dimensions based on the layout
  // Max width is row 5 (approx 14.5-15 units)
  // Max height is 6 rows
  
  // We need to calculate exact bounding box
  const totalWidth = (14.5 * UNIT_SIZE) + (14 * GAP) + (2 * PADDING); // Approx
  const totalHeight = (6 * UNIT_SIZE) + (5 * GAP) + (2 * PADDING);

  return (
    <div className="relative inline-block p-4 rounded-3xl bg-[#0d0d0f] shadow-2xl border border-[#27272a]">
      {/* Aluminum Chassis Gradient/Texture Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#2a2a2c] to-[#1c1c1e] pointer-events-none" />
      
      {/* The "Inset" well where the keys sit */}
      <div className="absolute inset-2 rounded-2xl bg-[#0f0f10] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none border-b border-[#3f3f46]/20" />

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${1000} ${360}`} // Fixed viewport for scaling, based on approx calculation
        className="relative z-10 w-full h-auto max-w-5xl"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {KEYBOARD_LAYOUT.map((row, rowIndex) => {
          let currentX = 0;
          
          return (
            <g key={rowIndex} transform={`translate(0, ${rowIndex * (UNIT_SIZE + GAP)})`}>
              {row.map((keyData) => {
                const isActive = Array.isArray(keyData.code)
                  ? keyData.code.some(c => activeKeys.has(c))
                  : activeKeys.has(keyData.code);

                // Calculate X position
                // If the key has a manual X offset (rare, but possible), use it? 
                // Currently just flow layout.
                const xPos = currentX;
                
                // Calculate Y offset (mostly for Arrow Keys)
                const yOffset = keyData.y ? keyData.y * (UNIT_SIZE + GAP) : 0;
                
                // Advance cursor
                const keyPixelWidth = keyData.width * UNIT_SIZE + (keyData.width - 1) * GAP;
                
                // For arrow keys in the last block, we need special handling if they are stacked.
                // The layout definition handles them sequentially. 
                // Up Arrow: width 1, height 0.5. 
                // Down Arrow: width 1, height 0.5, y offset 0.5.
                // But in the array, they are distinct items.
                // We shouldn't advance X for the 'Up' arrow if the 'Down' arrow is coming right after in the same column?
                // Actually, standard DOM flow logic:
                // Layout: Left, Up, Down, Right.
                // Up and Down share the same column.
                // In my constants, I put them in sequence. 
                // Fix: In the loop, if we see 'Up', we render it but don't advance X fully?
                // No, let's look at the constants. I used a flat array for the row.
                // Row 5: ... Left, Up, Down, Right. 
                // This means Up is drawn, X advances. Down is drawn, X advances. 
                // This would place them side-by-side. We want them stacked.
                
                let renderedX = xPos;
                let renderedY = yOffset;

                if (keyData.id === 'arrowUp') {
                   // Don't change renderedX
                   // Advance currentX only partially? Or handle via specific hardcoding?
                   // Let's use a simpler hack: The `arrowDown` in my constants needs a negative margin or we handle it here.
                } 
                if (keyData.id === 'arrowDown') {
                    // It needs to be shifted back left to be under Up.
                    renderedX = xPos - (UNIT_SIZE + GAP); 
                    // And we do not advance currentX because we already did for Up (which took the column width)
                    // Wait, if Up took the width, currentX is past the column.
                    // So Down needs to be at currentX - width.
                    // Right arrow will be at currentX (which is correct, after the column).
                }

                // Render
                const component = (
                   <Key
                    key={keyData.id}
                    data={keyData}
                    isActive={isActive}
                    unitSize={UNIT_SIZE}
                    gap={GAP}
                    x={renderedX}
                    y={renderedY}
                  />
                );

                // Update cursor
                if (keyData.id !== 'arrowDown') {
                    currentX += keyPixelWidth + GAP;
                }
                
                return component;
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};