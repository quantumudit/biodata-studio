import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import type { BiodiversityData, LayoutOption, DesignTheme } from '../types';
import { BiodataCard } from '../components/preview/BiodataCard';
import { ThemeSelector } from '../components/studio/ThemeSelector';
import { ExportPanel } from '../components/studio/ExportPanel';

interface PreviewViewProps {
  data: BiodiversityData;
  layout: LayoutOption;
  theme: DesignTheme;
  isDownloading: boolean;
  isInIframe: boolean;
  onLayoutChange: (layout: LayoutOption) => void;
  onThemeChange: (theme: DesignTheme) => void;
  onDownloadPng: () => void;
  onPrint: () => void;
  onBack: () => void;
}

export const PreviewView: React.FC<PreviewViewProps> = ({
  data, layout, theme, isDownloading, isInIframe,
  onLayoutChange, onThemeChange, onDownloadPng, onPrint, onBack,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">

    <div className="lg:col-span-4 space-y-6 print:hidden">
      <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6 space-y-6">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-850 uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forms Editor
        </button>

        <ThemeSelector
          theme={theme}
          layout={layout}
          onThemeChange={onThemeChange}
          onLayoutChange={onLayoutChange}
        />

        <ExportPanel
          isDownloading={isDownloading}
          isInIframe={isInIframe}
          onDownloadPng={onDownloadPng}
          onPrint={onPrint}
        />

      </div>

      <button
        onClick={onBack}
        className="w-full border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold py-3.5 uppercase tracking-wider rounded-xl transition-all flex justify-center items-center gap-2"
      >
        ← Back to Edit Details
      </button>
    </div>

    <div className="lg:col-span-8 flex flex-col items-center">
      <div className="w-full bg-white rounded-3xl border border-stone-200 p-4 md:p-6 shadow-xl relative print:border-0 print:p-0 print:shadow-none print:bg-transparent">

        <div className="flex items-center justify-between mb-4 border-b border-stone-150 pb-3 print:hidden">
          <span className="text-xs font-semibold uppercase text-stone-500 tracking-wider flex items-center gap-1.5 font-sans">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            Aesthetic Canvas Render {layout === 'full' ? '(A4 Ratio)' : '(1:1 Square)'}
          </span>
          <span className="text-[10px] text-stone-400 font-sans tracking-tight">
            Optimized for desktop view
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center py-2 bg-stone-50/50 rounded-2xl border border-stone-100 p-4 print:border-0 print:p-0 print:bg-transparent">
          <div className="min-w-fit flex justify-center">
            <BiodataCard data={data} layout={layout} theme={theme} />
          </div>
        </div>

      </div>
    </div>

  </div>
);
