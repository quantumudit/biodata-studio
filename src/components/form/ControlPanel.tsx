import React, { useState } from 'react';
import { User, Users, Phone, Upload, ShieldAlert } from 'lucide-react';
import type { AnyBiodataData, BiodiversityData, MuslimBiodataData, ReligionTemplate } from '../../types';
import { PersonalTab } from './tabs/PersonalTab';
import { MuslimPersonalTab } from './tabs/MuslimPersonalTab';
import { ProfessionalFamilyTab } from './tabs/ProfessionalFamilyTab';
import { PreferencesTab } from './tabs/PreferencesTab';
import { PhotoTab } from './tabs/PhotoTab';

interface ControlPanelProps {
  data: AnyBiodataData;
  religionTemplate: ReligionTemplate;
  onChange: React.Dispatch<React.SetStateAction<AnyBiodataData>> | ((data: AnyBiodataData) => void);
}

type TabKey = 'personal' | 'family' | 'contact' | 'photo';

const TABS: { key: TabKey; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { key: 'personal', label: 'Personal',             Icon: ({ className }) => <User className={className} /> },
  { key: 'family',   label: 'Professional & Family', Icon: ({ className }) => <Users className={className} /> },
  { key: 'contact',  label: 'Preferences',           Icon: ({ className }) => <Phone className={className} /> },
  { key: 'photo',    label: 'Portrait Photo',         Icon: ({ className }) => <Upload className={className} /> },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({ data, religionTemplate, onChange }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');

  const update = (updater: (prev: AnyBiodataData) => AnyBiodataData) => {
    try {
      (onChange as any)(updater);
    } catch {
      (onChange as any)(updater(data));
    }
  };

  const handleNestedChange = (section: string, field: string, value: string | number) => {
    update((prev) => ({ ...prev, [section]: { ...(prev[section as keyof typeof prev] as object), [field]: value } }));
  };

  const handleTopLevelChange = (field: string, value: string) => {
    update((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-4 border-b border-stone-150 bg-stone-50/50 rounded-xl p-1 gap-1 mb-5">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`py-2 text-xs font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === key
                ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4">
        {activeTab === 'personal' && (
          religionTemplate === 'hindu'
            ? <PersonalTab data={data as BiodiversityData} onChange={handleNestedChange} />
            : <MuslimPersonalTab data={data as MuslimBiodataData} onChange={handleNestedChange} />
        )}
        {activeTab === 'family'   && <ProfessionalFamilyTab data={data as BiodiversityData} onChange={handleNestedChange} />}
        {activeTab === 'contact'  && (
          <PreferencesTab
            data={data as BiodiversityData}
            onChange={handleNestedChange}
            onTopLevelChange={handleTopLevelChange}
          />
        )}
        {activeTab === 'photo'    && (
          <PhotoTab
            data={data as BiodiversityData}
            onImageChange={(img) => update((prev) => ({ ...prev, image: img }))}
          />
        )}
      </div>

      <div className="mt-8 p-3 bg-stone-100/60 border border-stone-150 rounded-xl text-[10px] text-stone-500 flex gap-2 items-start text-left leading-normal">
        <ShieldAlert className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
        <p>Fields and inputs are securely saved locally inside your web browser. Perfect for instant personal previewing and privacy.</p>
      </div>
    </div>
  );
};
