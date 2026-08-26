import React from 'react';
import type { MuslimPersonalInfo, ThemeStyleTokens } from '../../../types';
import { DetailBlock } from './DetailBlock';

interface MuslimPersonalBlockProps {
  personal: MuslimPersonalInfo;
  styles: ThemeStyleTokens;
}

export const MuslimPersonalBlock: React.FC<MuslimPersonalBlockProps> = ({ personal, styles }) => (
  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
    <DetailBlock label="Date of Birth & Age" value={`${personal.dob || '—'} (${personal.age} Years)`} styles={styles} />
    <DetailBlock label="Height & Weight" value={`${personal.height} • ${personal.weight}`} styles={styles} />
    <DetailBlock label="Sect" value={personal.sect} styles={styles} />
    <DetailBlock label="Maslak / School" value={personal.maslak} styles={styles} />
    <DetailBlock label="Religious Practice" value={personal.religiosity} styles={styles} />
    <DetailBlock label="Mehr Preference" value={personal.mehrPreference} styles={styles} />
  </div>
);
