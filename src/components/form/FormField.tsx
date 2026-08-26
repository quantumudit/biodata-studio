import React from 'react';

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'textarea';
  placeholder?: string;
  rows?: number;
}

const inputClass = 'w-full mt-1 px-3 py-2 border border-stone-200 rounded-lg text-stone-850 focus:border-stone-900 focus:ring-1 focus:ring-stone-900/10 focus:outline-none transition-all text-sm font-medium';
const labelClass = 'text-[10px] font-bold uppercase tracking-wider text-stone-500';

export const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = 'text', placeholder, rows }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {type === 'textarea' ? (
      <textarea
        rows={rows ?? 2}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    )}
  </div>
);
