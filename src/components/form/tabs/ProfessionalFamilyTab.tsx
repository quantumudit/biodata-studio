import React from 'react';
import { FormField } from '../FormField';
import type { BiodiversityData, FormFieldDef } from '../../../types';
import fields from '../../../data/formFields.json';

interface ProfessionalFamilyTabProps {
  data: BiodiversityData;
  onChange: (section: keyof BiodiversityData, field: string, value: string | number) => void;
}

export const ProfessionalFamilyTab: React.FC<ProfessionalFamilyTabProps> = ({ data, onChange }) => {
  const professionalFields = fields.professional as FormFieldDef[];
  const familyFields = fields.family as FormFieldDef[];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          1. Educational & Career Info
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {professionalFields.map((f) => (
          <div key={f.field} className={f.colSpan === 2 ? 'col-span-2' : ''}>
            <FormField
              label={f.label}
              value={(data.professional as Record<string, string>)[f.field] ?? ''}
              onChange={(v) => onChange('professional', f.field, v)}
              type={f.type}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100 pt-3">
        <span className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
          2. Parents & Siblings Status
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {familyFields.map((f) => (
          <div key={f.field} className={f.colSpan === 2 ? 'col-span-2' : ''}>
            <FormField
              label={f.label}
              value={(data.family as Record<string, string>)[f.field] ?? ''}
              onChange={(v) => onChange('family', f.field, v)}
              type={f.type}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
