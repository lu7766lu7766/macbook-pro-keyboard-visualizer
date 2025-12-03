import React from 'react';
import { KeyProps } from '../types';

export const Key: React.FC<KeyProps> = ({ data, isActive, unitSize, gap, x, y }) => {
  const width = data.width * unitSize + (data.width - 1) * gap;
  const height = (data.height || 1) * unitSize + ((data.height || 1) - 1) * gap;
  
  // Radius for rounded corners. MacBook keys are quite rounded.
  const radius = unitSize * 0.15; 

  const fillColor = isActive ? '#4a4a4c' : '#1e1e1e'; // Active: lighter gray, Inactive: very dark gray
  const textColor = isActive ? '#ffffff' : '#d1d5db'; // White when active, gray-300 when inactive
  const subTextColor = isActive ? '#ffffff' : '#9ca3af';

  // Calculate Label Positions
  const padding = unitSize * 0.15;
  
  // Font sizes
  const fontSizeMap = {
    xs: unitSize * 0.18,
    sm: unitSize * 0.22,
    md: unitSize * 0.28,
    lg: unitSize * 0.35,
  };
  const mainFontSize = fontSizeMap[data.fontSize || 'md'];
  const subFontSize = fontSizeMap['md'];

  // Determine positions based on alignment
  let mainLabelX = width / 2;
  let mainLabelY = height / 2 + mainFontSize / 3; // Vertically center approx
  let textAnchor = 'middle';

  if (data.alignment === 'bottom-left') {
    mainLabelX = padding;
    mainLabelY = height - padding;
    textAnchor = 'start';
  } else if (data.alignment === 'bottom-right') {
    mainLabelX = width - padding;
    mainLabelY = height - padding;
    textAnchor = 'end';
  } else if (data.alignment === 'left') {
    mainLabelX = padding;
    textAnchor = 'start';
  }

  // If there is a sublabel (like ! above 1), the main label usually moves down
  if (data.subLabel) {
    mainLabelX = width / 2;
    mainLabelY = height - padding * 1.5;
    textAnchor = 'middle';
  }

  // Icons positioning
  const iconSize = unitSize * 0.35;
  const iconX = width / 2 - iconSize / 2;
  const iconY = height / 2 - iconSize / 2;

  // Special case for Fn/Globe, Caps lock circle
  const isSpecialIcon = data.id === 'fn' || data.id === 'caps';
  const customIconX = data.id === 'fn' ? padding : (data.id === 'caps' ? width - padding - iconSize : iconX);
  const customIconY = data.id === 'fn' ? height - padding - iconSize : (data.id === 'caps' ? padding : iconY);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Shadow/Depth for 3D effect */}
      <rect
        x={0}
        y={1}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="#000"
        opacity={0.5}
      />
      
      {/* Main Key Body */}
      <rect
        className="transition-colors duration-75 ease-out"
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill={fillColor}
        stroke={isActive ? '#6b7280' : '#000'}
        strokeWidth={0.5}
      />

      {/* Backlight Glow (Only when active) */}
      {isActive && (
        <rect
           x={-2}
           y={-2}
           width={width + 4}
           height={height + 4}
           rx={radius + 2}
           fill="none"
           stroke="rgba(255, 255, 255, 0.4)"
           strokeWidth={2}
           filter="url(#glow)"
        />
      )}

      {/* Labels */}
      {data.label && (
        <text
          x={mainLabelX}
          y={mainLabelY}
          fill={textColor}
          fontSize={mainFontSize}
          fontFamily="Inter, sans-serif"
          fontWeight={data.subLabel ? 400 : 500}
          textAnchor={textAnchor}
          className="pointer-events-none select-none"
        >
          {data.label}
        </text>
      )}

      {/* Secondary Label (Top) */}
      {data.subLabel && (
        <text
          x={width / 2}
          y={padding + subFontSize}
          fill={subTextColor}
          fontSize={subFontSize}
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          className="pointer-events-none select-none"
        >
          {data.subLabel}
        </text>
      )}

      {/* Render Icon if present */}
      {data.icon && (
        <g 
          transform={`translate(${isSpecialIcon ? customIconX : iconX}, ${isSpecialIcon ? customIconY : iconY}) scale(${iconSize/24})`}
          color={textColor}
        >
          {data.icon}
        </g>
      )}

      {/* Active Key Light Point (Caps Lock Green Dot) */}
      {data.id === 'caps' && isActive && (
         <circle cx={width - padding * 2} cy={padding * 2} r={unitSize * 0.05} fill="#10b981" filter="url(#glow)" />
      )}
    </g>
  );
};
