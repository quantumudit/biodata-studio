import React from 'react';
import { FormField } from '../FormField';
import type { ChristianBiodataData, FormFieldDef } from '../../../types';
import fields from '../../../data/christianFormFields.json';

interface ChristianPersonalTabProps {
  data: ChristianBiodataData;
  onChange: (section: keyof ChristianBiodataData, field: string, value: string | number) => void;
}

export const ChristianPersonalTab: React.FC<ChristianPersonalTabProps> = ({ data, onChange }) => {
  const personalFields = fields.personal as FormFieldDef[];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          1. Personal Particulars
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {personalFields.slice(0, 6).map((f) => (
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
          2. Church Details
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {personalFields.slice(6).map((f) => (
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
