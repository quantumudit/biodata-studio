import React from 'react';
import type { HinduPersonalInfo, ThemeStyleTokens } from '../../../types';
import { DetailBlock } from './DetailBlock';

interface HinduPersonalBlockProps {
  personal: HinduPersonalInfo;
  styles: ThemeStyleTokens;
}

export const HinduPersonalBlock: React.FC<HinduPersonalBlockProps> = ({ personal, styles }) => (
  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
    <DetailBlock label="Date of Birth & Age" value={`${personal.dob || '—'} (${personal.age} Years)`} styles={styles} />
    <DetailBlock label="Height & Weight" value={`${personal.height} • ${personal.weight}`} styles={styles} />
    <DetailBlock label="Religion & Caste" value={`${personal.religion} • ${personal.caste}`} styles={styles} />
    <DetailBlock label="Gotra Lineage" value={personal.gotra} styles={styles} />
    <DetailBlock label="Moon Sign (Rashi)" value={personal.moonSign} styles={styles} />
    <DetailBlock label="Birth Nakshatra" value={personal.nakshatra} styles={styles} />
  </div>
);
