import React from 'react';
import type { DesignTheme, LayoutOption } from '../../types';
import { THEME_CONFIG } from '../../data/themeConfig';

interface ThemeSelectorProps {
  theme: DesignTheme;
  layout: LayoutOption;
  onThemeChange: (theme: DesignTheme) => void;
  onLayoutChange: (layout: LayoutOption) => void;
  availableThemes: DesignTheme[];
}

const ALL_THEMES = Object.entries(THEME_CONFIG) as [DesignTheme, (typeof THEME_CONFIG)[DesignTheme]][];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, layout, onThemeChange, onLayoutChange, availableThemes }) => {
  const themes = ALL_THEMES.filter(([key]) => availableThemes.includes(key));

  return (
    <>
      <div className="space-y-3 pt-2">
        <div>
          <h3 className="text-sm font-serif font-bold text-stone-900">Select Color Theme</h3>
          <p className="text-xs text-stone-500">Pick an artistic color-way for your card.</p>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {themes.map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => onThemeChange(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                theme === key
                  ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/10'
                  : `border-stone-200 ${cfg.hoverBorderClass}`
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: cfg.swatchColor }} />
                <span className="text-xs font-semibold text-stone-900 font-sans">{cfg.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t border-stone-100 pt-4">
        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Format Variant</h4>
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => onLayoutChange('full')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              layout === 'full' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            A4 Detailed
          </button>
          <button
            onClick={() => onLayoutChange('snapshot')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              layout === 'snapshot' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Square Card
          </button>
        </div>
      </div>
    </>
  );
};
