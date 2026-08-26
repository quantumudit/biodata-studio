import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import type { BiodiversityData } from '../types';
import defaultBiodata from '../data/defaultBiodata.json';

const STORAGE_KEY = 'matrimony_biodata_perfect_v2';

export function useBiodataStorage(): [BiodiversityData, Dispatch<SetStateAction<BiodiversityData>>] {
  const [biodata, setBiodata] = useState<BiodiversityData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.images && !parsed.image) {
          parsed.image = parsed.images.formal || parsed.images.casual || null;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Local storage read error', e);
    }
    return defaultBiodata as BiodiversityData;
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
