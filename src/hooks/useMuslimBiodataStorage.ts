import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import type { MuslimBiodataData } from '../types';
import defaultMuslimBiodata from '../data/defaultMuslimBiodata.json';

const STORAGE_KEY = 'matrimony_muslim_biodata_v1';

export function useMuslimBiodataStorage(): [MuslimBiodataData, Dispatch<SetStateAction<MuslimBiodataData>>] {
  const [biodata, setBiodata] = useState<MuslimBiodataData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Local storage read error', e);
    }
    return defaultMuslimBiodata as MuslimBiodataData;
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
