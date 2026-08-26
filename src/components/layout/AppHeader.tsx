import React from 'react';
import { Heart, RotateCcw, ShieldCheck } from 'lucide-react';

interface AppHeaderProps {
  name: string;
  onReset: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ name, onReset }) => (
  <header className="bg-white border-b border-stone-200/80 px-6 py-4 shadow-sm print:hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="p-2.5 bg-gradient-to-tr from-stone-800 to-stone-600 text-white rounded-xl shadow-md">
          <Heart className="w-5 h-5 fill-current text-rose-200" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-serif font-bold text-stone-900 tracking-wide">
              Signature Matrimonial Biodata Engine
            </h1>
            <span className="text-[10px] uppercase tracking-wider font-semibold bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200 font-sans">
              No Marriage Card Fuss
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Create a stunning aesthetic layout for <strong className="text-stone-850">{name || 'your name'}</strong> without traditional marriage-card header clutter.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          onClick={onReset}
          className="text-stone-500 hover:text-stone-800 font-medium text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-stone-100 transition-all cursor-pointer"
          title="Reset input fields with defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Defaults
        </button>
        <span className="h-5 w-[1px] bg-stone-200" />
        <div className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          100% Client-Side / Secure
        </div>
      </div>
    </div>
  </header>
);
