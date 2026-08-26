import React from 'react';

interface StepIndicatorProps {
  currentStep: 'form' | 'preview';
  onStepChange: (step: 'form' | 'preview') => void;
  hasName: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepChange, hasName }) => (
  <div className="max-w-7xl mx-auto px-4 mt-6 print:hidden">
    <div className="flex items-center justify-center gap-2 bg-white border border-stone-200/80 rounded-2xl p-2 max-w-md mx-auto shadow-sm">
      <button
        onClick={() => onStepChange('form')}
        className={`flex-1 py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
          currentStep === 'form'
            ? 'bg-stone-900 text-white shadow-sm'
            : 'text-stone-400 hover:text-stone-700'
        }`}
      >
        <span>1.</span> Customize Details
      </button>
      <button
        onClick={() => onStepChange('preview')}
        disabled={!hasName}
        className={`flex-1 py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
          currentStep === 'preview'
            ? 'bg-stone-900 text-white shadow-sm'
            : 'text-stone-300 hover:text-stone-600 disabled:opacity-50'
        }`}
      >
        <span>2.</span> Preview & Export
      </button>
    </div>
  </div>
);
