import React from 'react';
import { Layout, Image as ImageIcon, Check, AlertCircle, Eye } from 'lucide-react';
import type { LayoutOption } from '../../types';

interface LayoutSelectorProps {
  layout: LayoutOption;
  onLayoutChange: (layout: LayoutOption) => void;
  onProceedToPreview: () => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({ layout, onLayoutChange, onProceedToPreview }) => (
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

    <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl flex gap-3 text-xs leading-normal text-amber-900/90">
      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-amber-950">Aesthetic Checkpoint</p>
        <p className="mt-0.5 text-[11px] text-amber-900/80">
          As requested, we strictly removed religious header text placeholders. One elegant, high-fidelity profile picture can be loaded in the <strong className="font-semibold">"Portrait Photo" tab</strong>.
        </p>
      </div>
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
