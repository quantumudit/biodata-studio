import React, { useState, useEffect } from 'react';
import type { LayoutOption, DesignTheme, ReligionTemplate } from './types';
import { useBiodataStorage } from './hooks/useBiodataStorage';
import { useMuslimBiodataStorage } from './hooks/useMuslimBiodataStorage';
import { useChristianBiodataStorage } from './hooks/useChristianBiodataStorage';
import { AppHeader } from './components/layout/AppHeader';
import { StepIndicator } from './components/layout/StepIndicator';
import { FormView } from './views/FormView';
import { PreviewView } from './views/PreviewView';
import { THEME_CONFIG, AVAILABLE_THEMES } from './data/themeConfig';
import { toPng } from 'html-to-image';

export default function App() {
  const [hinduBiodata, setHinduBiodata] = useBiodataStorage();
  const [muslimBiodata, setMuslimBiodata] = useMuslimBiodataStorage();
  const [christianBiodata, setChristianBiodata] = useChristianBiodataStorage();
  const [layout, setLayout] = useState<LayoutOption>('full');
  const [theme, setTheme] = useState<DesignTheme>('natural');
  const [religionTemplate, setReligionTemplate] = useState<ReligionTemplate>('hindu');
  const [currentStep, setCurrentStep] = useState<'form' | 'preview'>('form');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  const activeBiodata = religionTemplate === 'hindu'
    ? hinduBiodata
    : religionTemplate === 'muslim'
    ? muslimBiodata
    : christianBiodata;
  const activeSetBiodata = religionTemplate === 'hindu'
    ? setHinduBiodata
    : religionTemplate === 'muslim'
    ? setMuslimBiodata
    : setChristianBiodata;

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Auto-switch theme when religion changes if current theme isn't available for the new religion
  useEffect(() => {
    const allowed = AVAILABLE_THEMES[religionTemplate];
    if (!allowed.includes(theme)) {
      setTheme(allowed[0]);
    }
  }, [religionTemplate]);

  const handleReligionChange = (religion: ReligionTemplate) => {
    setReligionTemplate(religion);
  };

  const handleReset = () => {
    const storageKey = religionTemplate === 'hindu'
      ? 'matrimony_biodata_perfect_v2'
      : religionTemplate === 'muslim'
      ? 'matrimony_muslim_biodata_v1'
      : 'matrimony_christian_biodata_v1';
    if (window.confirm("Restore default sample data? Any uploaded photo or customized text will be replaced.")) {
      localStorage.removeItem(storageKey);
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
      link.download = `${activeBiodata.personal.name || 'Matrimonials'}_Biodata_${fileSuffix}.png`;
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
      <AppHeader name={activeBiodata.personal.name} onReset={handleReset} />
      <div className="max-w-7xl mx-auto px-4 mt-6 print:hidden">
        <StepIndicator
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          hasName={!!activeBiodata.personal.name}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 mt-6 print:mt-0 print:px-0">
        {currentStep === 'form' ? (
          <FormView
            data={activeBiodata}
            layout={layout}
            religionTemplate={religionTemplate}
            onDataChange={activeSetBiodata as any}
            onLayoutChange={setLayout}
            onReligionChange={handleReligionChange}
            onProceed={() => setCurrentStep('preview')}
          />
        ) : (
          <PreviewView
            data={activeBiodata}
            layout={layout}
            theme={theme}
            religionTemplate={religionTemplate}
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
