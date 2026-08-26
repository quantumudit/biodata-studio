import React from 'react';
import type { DesignTheme } from '../../../types';

export const ThemeOrnament: React.FC<{ theme: DesignTheme }> = ({ theme }) => {
  if (theme === 'royal') {
    return (
      <div className="flex items-center justify-center gap-4 my-2 opacity-90">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#8F6A28]/40 to-transparent flex-1" />
        <span className="text-[#8F6A28] text-base font-serif select-none tracking-widest">✦ ✶ ✦</span>
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#8F6A28]/40 to-transparent flex-1" />
      </div>
    );
  }
  if (theme === 'natural') {
    return (
      <div className="flex items-center justify-center gap-4 my-2 opacity-80">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40]/40 to-transparent flex-1" />
        <span className="text-[#5A5A40] text-sm select-none tracking-widest">❃ ❀ ❃</span>
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#5A5A40]/40 to-transparent flex-1" />
      </div>
    );
  }
  if (theme === 'sunset') {
    return (
      <div className="flex items-center justify-center gap-4 my-2 opacity-80">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#9C4A34]/30 to-transparent flex-1" />
        <span className="text-[#9C4A34] text-xs select-none tracking-wider">❦ ❧ ❦</span>
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#9C4A34]/30 to-transparent flex-1" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-4 my-2 opacity-40 animate-pulse">
      <span className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent flex-1" />
      <span className="text-stone-600 text-xs select-none tracking-widest">◆ ◆ ◆</span>
      <span className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent flex-1" />
    </div>
  );
};
