import React from 'react';
import { FormField } from '../FormField';
import type { BiodiversityData, FormFieldDef } from '../../../types';
import fields from '../../../data/formFields.json';

interface PreferencesTabProps {
  data: BiodiversityData;
  onChange: (section: keyof BiodiversityData, field: string, value: string | number) => void;
  onTopLevelChange: (field: keyof BiodiversityData, value: string) => void;
}

export const PreferencesTab: React.FC<PreferencesTabProps> = ({ data, onChange, onTopLevelChange }) => {
  const contactFields = fields.contact as FormFieldDef[];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          1. Contact Coordination
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {contactFields.map((f) => (
          <div key={f.field} className={f.colSpan === 2 ? 'col-span-2' : ''}>
            <FormField
              label={f.label}
              value={(data.contact as Record<string, string>)[f.field] ?? ''}
              onChange={(v) => onChange('contact', f.field, v)}
              type={f.type}
              placeholder={f.placeholder}
              rows={f.rows}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100 pt-3">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          2. Partner Preferences
        </span>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-sans">
          Expectations summary description
        </label>
        <textarea
          rows={4}
          value={data.partnerPreferences}
          onChange={(e) => onTopLevelChange('partnerPreferences', e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-stone-200 rounded-lg text-stone-850 focus:border-stone-900 focus:ring-1 focus:ring-stone-900/10 focus:outline-none transition-all text-xs font-semibold leading-relaxed"
          placeholder="Describe your expectations about partner's background, core values, location views..."
        />
      </div>
    </div>
  );
};
