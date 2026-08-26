import React from 'react';
import type { DesignTheme, ThemeStyleTokens } from '../../../types';

interface DetailBlockProps {
  label: string;
  value: React.ReactNode;
  styles: ThemeStyleTokens;
}

export const DetailBlock: React.FC<DetailBlockProps> = ({ label, value, styles }) => (
  <div className="space-y-0.5">
    <span className={`${styles.labelFont} ${styles.descriptorLabel} block opacity-85`}>
      {label}
    </span>
    <span className={`${styles.valueFont} ${styles.primaryText} block leading-normal`}>
      {value || '—'}
    </span>
  </div>
);

interface SnapshotDetailBlockProps {
  label: string;
  value: string | number;
  theme: DesignTheme;
}

export const SnapshotDetailBlock: React.FC<SnapshotDetailBlockProps> = ({ label, value, theme }) => {
  let sLabelFont = '';
  let sValueFont = '';

  if (theme === 'natural') {
    sLabelFont = 'font-sans text-[10px] uppercase tracking-[0.14em] text-[#8B7E66]';
    sValueFont = 'font-warm font-medium text-[14px] text-[#2D2A26]';
  } else if (theme === 'royal') {
    sLabelFont = 'font-sans text-[9.5px] uppercase tracking-[0.16em] text-[#A38245]';
    sValueFont = 'font-editorial font-medium text-[15px] text-[#241F17]';
  } else if (theme === 'minimalist') {
    sLabelFont = 'font-modern text-[9px] font-bold uppercase tracking-[0.15em] text-[#666666]';
    sValueFont = 'font-sans font-semibold text-[12.5px] text-[#171717]';
  } else {
    sLabelFont = 'font-sans text-[10px] uppercase tracking-[0.13em] text-[#B87A68]';
    sValueFont = 'font-editorial font-medium text-[15px] text-[#3D2721]';
  }

  return (
    <div className="space-y-0.5">
      <span className={`${sLabelFont} block opacity-95 font-bold`}>{label}</span>
      <span className={`${sValueFont} block leading-snug`}>{value || '—'}</span>
    </div>
  );
};
