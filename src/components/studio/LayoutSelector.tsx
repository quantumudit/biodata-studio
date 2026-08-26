import React, { useState } from 'react';
import { Layout, Image as ImageIcon, Check, BookOpen, ChevronDown, Eye } from 'lucide-react';
import type { LayoutOption, ReligionTemplate } from '../../types';

interface LayoutSelectorProps {
  layout: LayoutOption;
  onLayoutChange: (layout: LayoutOption) => void;
  religionTemplate: ReligionTemplate;
  onReligionChange: (religion: ReligionTemplate) => void;
  onProceedToPreview: () => void;
}

const RELIGION_OPTIONS: { value: ReligionTemplate; label: string; available: boolean }[] = [
  { value: 'hindu',    label: 'Hindu',     available: true  },
  { value: 'muslim',   label: 'Muslim',    available: true  },
  { value: 'christian',label: 'Christian', available: false },
];

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layout, onLayoutChange, religionTemplate, onReligionChange, onProceedToPreview,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedLabel = RELIGION_OPTIONS.find(o => o.value === religionTemplate)?.label ?? 'Hindu';

  return (
    <div className="bg-white rounded-2xl shadow-md border border-stone-250 p-6 space-y-5">
      <div>
        <h2 className="text-lg font-serif font-bold text-stone-900">Choose Layout Variant</h2>
        <p className="text-xs text-stone-500 mt-1">Select how dense your exported information should be.</p>
      </div>

      <div className="space-y-3">
        <label
          onClick={() => onLayoutChange('full')}
          className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
            layout === 'full' ? 'border-stone-900 bg-stone-50/50 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${layout === 'full' ? 'bg-stone-905 text-stone-900' : 'bg-stone-100 text-stone-500'}`}>
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-stone-900">Full Standard Biodata</span>
              <span className="block text-[11px] text-stone-500 mt-0.5">Classic detailed single-page layout (A4 Format)</span>
            </div>
            {layout === 'full' && (
              <span className="absolute top-4 right-4 bg-stone-900 text-white p-0.5 rounded-full">
                <Check className="w-3 h-3" />
              </span>
            )}
          </div>
        </label>

        <label
          onClick={() => onLayoutChange('snapshot')}
          className={`block p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
            layout === 'snapshot' ? 'border-stone-900 bg-stone-50/50 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${layout === 'snapshot' ? 'bg-stone-905 text-stone-900' : 'bg-stone-100 text-stone-500'}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-stone-900">Square Card Snapshot</span>
              <span className="block text-[11px] text-stone-500 mt-0.5">Perfect 1:1 image for instant WhatsApp messaging</span>
            </div>
            {layout === 'snapshot' && (
              <span className="absolute top-4 right-4 bg-stone-900 text-white p-0.5 rounded-full">
                <Check className="w-3 h-3" />
              </span>
            )}
          </div>
        </label>
      </div>

      {/* Religion / Community selector */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-stone-500" />
          <span className="text-sm font-semibold text-stone-700">Religion / Community</span>
        </div>
        <div className="relative">
          {dropdownOpen && (
            <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />
          )}
          <button
            type="button"
            onClick={() => setDropdownOpen(prev => !prev)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm border border-stone-200 rounded-xl bg-white text-stone-900 hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900/20 transition-colors cursor-pointer"
          >
            <span>{selectedLabel}</span>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${dropdownOpen ? '-rotate-180' : ''}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-lg z-10 overflow-hidden">
              {RELIGION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={!opt.available}
                  onClick={() => { onReligionChange(opt.value); setDropdownOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                    !opt.available
                      ? 'text-stone-300 cursor-not-allowed'
                      : opt.value === religionTemplate
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-800 hover:bg-stone-50 cursor-pointer'
                  }`}
                >
                  <span>{opt.label}</span>
                  {!opt.available && (
                    <span className="text-[10px] font-medium text-stone-300 border border-stone-150 rounded-md px-1.5 py-0.5 leading-none">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-[11px] text-stone-400 pl-0.5">More community templates are on the way.</p>
      </div>

      <button
        onClick={onProceedToPreview}
        className="w-full bg-stone-900 hover:bg-stone-850 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
      >
        <Eye className="w-4 h-4" />
        View Layout & Styles ↠
      </button>
    </div>
  );
};
