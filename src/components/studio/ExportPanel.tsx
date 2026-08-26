import React from 'react';
import { Image as ImageIcon, Printer } from 'lucide-react';

interface ExportPanelProps {
  isDownloading: boolean;
  isInIframe: boolean;
  onDownloadPng: () => void;
  onPrint: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ isDownloading, isInIframe, onDownloadPng, onPrint }) => (
  <div className="space-y-3 border-t border-stone-100 pt-5">
    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Export Formats</h3>

    <button
      onClick={onDownloadPng}
      disabled={isDownloading}
      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
    >
      <ImageIcon className="w-5 h-5" />
      {isDownloading ? 'Parsing Artwork...' : 'Download as PNG Image'}
    </button>

    <button
      onClick={onPrint}
      className="w-full bg-stone-900 hover:bg-stone-850 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer mt-2"
    >
      <Printer className="w-5 h-5 animate-pulse" />
      Print PDF (A4 size)
    </button>

    {isInIframe && (
      <div className="p-3 bg-amber-50 border border-amber-200/70 rounded-xl leading-relaxed text-[11px] text-amber-900/90 gap-1.5 mt-2">
        <span className="font-bold text-amber-950 uppercase tracking-wide block mb-0.5">IFrame Notice:</span>
        Direct print dialogue triggers are blocked inside interactive preview frames by browser security.
        If clicking does nothing, click the <strong className="font-semibold text-stone-900">"Open in a new tab"</strong> icon at the top-right and print from there, or download the crisp PNG instead!
      </div>
    )}

    <div className="text-[11px] text-stone-500 font-medium leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
      <span className="font-semibold text-stone-700">Printing Guidelines:</span>
      <ul className="list-disc pl-4 mt-1 space-y-1">
        <li>Set layout mode to <strong>A4 Portrait</strong>.</li>
        <li>Toggle <strong>"Background graphics" to ON</strong>.</li>
        <li>Set Margins to <strong>"None"</strong> for maximum edge bleed.</li>
      </ul>
    </div>
  </div>
);
