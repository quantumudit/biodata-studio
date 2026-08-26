import React from 'react';
import type { DesignTheme } from '../../../types';

export const ThemeAvatarPlaceholder: React.FC<{ theme: DesignTheme }> = ({ theme }) => {
  let jacketColor = '#5A5A40';
  let jacketShadow = '#4B4B35';
  let innerShirtColor = '#FFFFFF';
  let bgRund = '#E8E4DB';

  if (theme === 'royal') {
    jacketColor = '#7B5916';
    jacketShadow = '#5C4210';
    innerShirtColor = '#FFFDF9';
    bgRund = '#DFBA73';
  } else if (theme === 'minimalist') {
    jacketColor = '#171717';
    jacketShadow = '#0B0B0B';
    innerShirtColor = '#FFFFFF';
    bgRund = '#D4D4D4';
  } else if (theme === 'sunset') {
    jacketColor = '#9C4A34';
    jacketShadow = '#783523';
    innerShirtColor = '#FFFBF8';
    bgRund = '#E6C5B5';
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 relative overflow-hidden bg-black/[0.01]">
      <svg viewBox="0 0 200 200" className="w-24 h-24 mx-auto mt-2 z-10" fill="none">
        <circle cx="100" cy="100" r="90" fill={bgRund} opacity="0.4" />
        <path d="M60 70c10-25 35-30 45-30s35 5 45 30c3 8 5 15 5 15s-15-5-25-3c-15 3-20 5-30 5s-15-2-30-5c-10-2-25 3-25 3s2-7 15-15z" fill="#2C2724" />
        <path d="M50 72c5-10 15-15 25-18 8-3 18-3 25-1 10 2 20 6 25 12 5 6 3 12 0 15s-10-5-20-4c-12 1-18 5-30 4-12-1-20-5-25-8z" fill="#1A1817" />
        <circle cx="53" cy="95" r="9" fill="#E8B090" />
        <circle cx="147" cy="95" r="9" fill="#E8B090" />
        <path d="M58 80c0 0-3 20 2 35 5 15 15 25 40 25s35-10 40-25c5-15 2-35 2-35H58z" fill="#F8C4A0" />
        <path d="M85 130v25h30v-25H85z" fill="#E8B090" />
        <path d="M82 140l18 35 18-35h-36z" fill={innerShirtColor} />
        <path d="M45 200c12-32 30-48 55-48s43 16 55 48H45z" fill={jacketColor} />
        <path d="M72 152l18 35L100 152l10 35 18-35L118 200H82l-10-48z" fill={jacketShadow} />
        <path d="M68 85c5-3 12-3 18-1" stroke="#2C2724" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M114 84c6-2 13-2 18 1" stroke="#2C2724" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="62" y="87" width="30" height="20" rx="4" stroke="#FAF8F5" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.25" />
        <rect x="108" y="87" width="30" height="20" rx="4" stroke="#FAF8F5" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.25" />
        <line x1="92" y1="95" x2="108" y2="95" stroke="#FAF8F5" strokeWidth="3" />
        <circle cx="77" cy="97" r="3" fill="#3D2314" />
        <circle cx="123" cy="97" r="3" fill="#3D2314" />
        <path d="M96 98c2 4 6 4 8 0" stroke="#E8B090" strokeWidth="2.5" fill="none" />
        <path d="M86 122c8 4 20 4 28 0" stroke="#C86A6A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M60 110c2 15 15 28 40 28s38-13 40-28c1-5-2-4-2-4s-3 18-38 18-38-18-38-18-3 1 0 4z" fill="#2C2C2C" opacity="0.1" />
      </svg>
    </div>
  );
};
