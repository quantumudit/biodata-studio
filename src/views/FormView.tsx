import React from 'react';
import type { BiodiversityData, LayoutOption } from '../types';
import { LayoutSelector } from '../components/studio/LayoutSelector';
import { ControlPanel } from '../components/form/ControlPanel';

interface FormViewProps {
  data: BiodiversityData;
  layout: LayoutOption;
  onDataChange: React.Dispatch<React.SetStateAction<BiodiversityData>>;
  onLayoutChange: (layout: LayoutOption) => void;
  onProceed: () => void;
}

export const FormView: React.FC<FormViewProps> = ({ data, layout, onDataChange, onLayoutChange, onProceed }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in print:hidden">

    <div className="lg:col-span-4 space-y-6">
      <LayoutSelector layout={layout} onLayoutChange={onLayoutChange} onProceedToPreview={onProceed} />
      <div className="p-4 bg-white/60 border border-stone-200 rounded-2xl flex gap-3 text-xs text-stone-600 leading-relaxed shadow-sm">
        <span className="text-xl">💡</span>
        <p>
          Fill out the parameters. Once you press the view preview action, you can instantly select multiple artistic color themes and download a crisp, premium printout.
        </p>
      </div>
    </div>

    <div className="lg:col-span-8 bg-white rounded-2xl shadow-md border border-stone-200 p-6">
      <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3 mb-5">
        Customize Registry Fields
      </h2>
      <ControlPanel data={data} onChange={onDataChange} />
      <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
        <button
          onClick={onProceed}
          className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-8 rounded-xl transition-all uppercase tracking-wider text-xs flex items-center gap-2 group cursor-pointer shadow-md"
        >
          Proceed to Preview & Export
          <span className="group-hover:translate-x-1.5 transition-transform font-bold">↠</span>
        </button>
      </div>
    </div>

  </div>
);
