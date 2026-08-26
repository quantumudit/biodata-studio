import React from 'react';
import type { BiodiversityData, LayoutOption, DesignTheme } from '../../types';
import { FullLayout } from './FullLayout';
import { SnapshotLayout } from './SnapshotLayout';

interface BiodataCardProps {
  data: BiodiversityData;
  layout: LayoutOption;
  theme: DesignTheme;
}

export const BiodataCard: React.FC<BiodataCardProps> = ({ data, layout, theme }) => {
  if (layout === 'full') {
    return <FullLayout data={data} theme={theme} />;
  }
  return <SnapshotLayout data={data} theme={theme} />;
};
