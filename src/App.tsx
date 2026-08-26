import React, { useState, useEffect } from 'react';
import type { LayoutOption, DesignTheme } from './types';
import { useBiodataStorage } from './hooks/useBiodataStorage';
import { AppHeader } from './components/layout/AppHeader';
import { StepIndicator } from './components/layout/StepIndicator';
import { FormView } from './views/FormView';
import { PreviewView } from './views/PreviewView';
import { THEME_CONFIG } from './data/themeConfig';
import { toPng } from 'html-to-image';

export default function App() {
  const [biodata, setBiodata] = useBiodataStorage();
  const [layout, setLayout] = useState<LayoutOption>('full');
  const [theme, setTheme] = useState<DesignTheme>('natural');
  const [currentStep, setCurrentStep] = useState<'form' | 'preview'>('form');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  const handleReset = () => {
    if (window.confirm("Restore default sample data? Any uploaded photo or customized text will be replaced.")) {
      // Trigger hook reset by clearing storage — reload will seed from defaultBiodata.json
      localStorage.removeItem('matrimony_biodata_perfect_v2');
      window.location.reload();
    }
  };

  const handleDownloadPng = async () => {
    const element = document.getElementById('biodata-print-section');
    if (!element) {
      alert('Error: Preview target container not prepared.');
      return;
    }
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const fileSuffix = layout === 'full' ? 'A4_Detailed' : 'Square_Snapshot';
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2.2,
        backgroundColor: THEME_CONFIG[theme].exportBgColor,
        style: { transform: 'scale(1)', borderRadius: '0' },
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `${biodata.personal.name || 'Matrimonials'}_Biodata_${fileSuffix}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to parse PNG canvas', error);
      alert("An issue occurred generating the PNG. Please use 'Print / Save PDF' instead or try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Direct window.print() failed inside sandbox iframe:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-stone-800 pb-12 print:bg-white print:pb-0">
      <AppHeader name={biodata.personal.name} onReset={handleReset} />
      <div className="max-w-7xl mx-auto px-4 mt-6 print:hidden">
        <StepIndicator
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          hasName={!!biodata.personal.name}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 mt-6 print:mt-0 print:px-0">
        {currentStep === 'form' ? (
          <FormView
            data={biodata}
            layout={layout}
            onDataChange={setBiodata}
            onLayoutChange={setLayout}
            onProceed={() => setCurrentStep('preview')}
          />
        ) : (
          <PreviewView
            data={biodata}
            layout={layout}
            theme={theme}
            isDownloading={isDownloading}
            isInIframe={isInIframe}
            onLayoutChange={setLayout}
            onThemeChange={setTheme}
            onDownloadPng={handleDownloadPng}
            onPrint={handlePrint}
            onBack={() => setCurrentStep('form')}
          />
        )}
      </main>
    </div>
  );
}
