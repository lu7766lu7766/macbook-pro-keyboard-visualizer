import React from 'react';

export interface KeyData {
  id: string; // Unique identifier
  label?: string; // Main center label (e.g., 'A')
  subLabel?: string; // Top or secondary label (e.g., '!', '@')
  bottomLabel?: string; // Bottom label (e.g., 'command')
  icon?: React.ReactNode; // SVG icon component if needed
  width: number; // Width in units (1u = standard key)
  height?: number; // Height in units (default 1)
  x?: number; // Optional manual X offset
  y?: number; // Optional manual Y offset (for arrow keys)
  code: string | string[]; // DOM KeyboardEvent.code (e.g., 'KeyA')
  type?: 'normal' | 'mod' | 'special'; // Styling hint
  alignment?: 'center' | 'left' | 'right' | 'bottom-left' | 'bottom-right';
  fontSize?: 'sm' | 'md' | 'lg' | 'xs';
}

export interface KeyProps {
  data: KeyData;
  isActive: boolean;
  unitSize: number;
  gap: number;
  x: number;
  y: number;
}