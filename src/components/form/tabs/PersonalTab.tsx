import React from 'react';
import { FormField } from '../FormField';
import type { BiodiversityData, FormFieldDef } from '../../../types';
import fields from '../../../data/formFields.json';

interface PersonalTabProps {
  data: BiodiversityData;
  onChange: (section: keyof BiodiversityData, field: string, value: string | number) => void;
}

export const PersonalTab: React.FC<PersonalTabProps> = ({ data, onChange }) => {
  const personalFields = fields.personal as FormFieldDef[];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          1. Personal Particulars
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {personalFields.slice(0, 8).map((f) => (
          <div key={f.field} className={f.colSpan === 2 ? 'col-span-2' : ''}>
            <FormField
              label={f.label}
              value={(data.personal as Record<string, string | number>)[f.field] ?? ''}
              onChange={(v) => onChange('personal', f.field, f.type === 'number' ? parseInt(v) || 0 : v)}
              type={f.type}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100 pt-3">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          2. Horoscope Lineage
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {personalFields.slice(8).map((f) => (
          <div key={f.field} className={f.colSpan === 2 ? 'col-span-2' : ''}>
            <FormField
              label={f.label}
              value={(data.personal as Record<string, string | number>)[f.field] ?? ''}
              onChange={(v) => onChange('personal', f.field, v)}
              type={f.type}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
