import React from 'react';
import type { AnyBiodataData, LayoutOption, DesignTheme, ReligionTemplate } from '../../types';
import { FullLayout } from './FullLayout';
import { SnapshotLayout } from './SnapshotLayout';

interface BiodataCardProps {
  data: AnyBiodataData;
  layout: LayoutOption;
  theme: DesignTheme;
  religionTemplate: ReligionTemplate;
}

export const BiodataCard: React.FC<BiodataCardProps> = ({ data, layout, theme, religionTemplate }) => {
  if (layout === 'full') {
    return <FullLayout data={data} theme={theme} religionTemplate={religionTemplate} />;
  }
  return <SnapshotLayout data={data} theme={theme} religionTemplate={religionTemplate} />;
};
