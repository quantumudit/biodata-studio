import React from 'react';
import type { ChristianPersonalInfo, ThemeStyleTokens } from '../../../types';
import { DetailBlock } from './DetailBlock';

interface ChristianPersonalBlockProps {
  personal: ChristianPersonalInfo;
  styles: ThemeStyleTokens;
}

export const ChristianPersonalBlock: React.FC<ChristianPersonalBlockProps> = ({ personal, styles }) => (
  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
    <DetailBlock label="Date of Birth & Age" value={`${personal.dob || '—'} (${personal.age} Years)`} styles={styles} />
    <DetailBlock label="Height & Weight" value={`${personal.height} • ${personal.weight}`} styles={styles} />
    <DetailBlock label="Denomination" value={personal.denomination} styles={styles} />
    <DetailBlock label="Parish / Church" value={personal.parish} styles={styles} />
    <DetailBlock label="Baptism" value={personal.baptism} styles={styles} />
    <DetailBlock label="Confirmation" value={personal.confirmation} styles={styles} />
  </div>
);
