import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import type { ChristianBiodataData } from '../types';
import defaultChristianBiodata from '../data/defaultChristianBiodata.json';

const STORAGE_KEY = 'matrimony_christian_biodata_v1';

export function useChristianBiodataStorage(): [ChristianBiodataData, Dispatch<SetStateAction<ChristianBiodataData>>] {
  const [biodata, setBiodata] = useState<ChristianBiodataData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Local storage read error', e);
    }
    return defaultChristianBiodata as ChristianBiodataData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(biodata));
    } catch (e) {
      console.error('Local storage write error', e);
    }
  }, [biodata]);

  return [biodata, setBiodata];
}
