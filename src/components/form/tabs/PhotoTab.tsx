import React from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { usePhotoUpload } from '../../../hooks/usePhotoUpload';
import type { BiodiversityData } from '../../../types';

interface PhotoTabProps {
  data: BiodiversityData;
  onImageChange: (image: string | null) => void;
}

export const PhotoTab: React.FC<PhotoTabProps> = ({ data, onImageChange }) => {
  const { handleFileChange, removePhoto } = usePhotoUpload(onImageChange);

  return (
    <div className="space-y-4 animate-fade-in text-center py-4 bg-stone-50/50 rounded-2xl border border-stone-200 p-5">
      <div className="max-w-sm mx-auto space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wide">
            Candidate Portrait Photo
          </h3>
          <p className="text-stone-500 text-[11px] leading-relaxed">
            Upload exactly 1 high-resolution picture from your mobile or laptop. This photo is centered precisely on both templates.
          </p>
        </div>
        {data.image ? (
          <div className="relative rounded-2xl border-2 border-stone-200 overflow-hidden h-52 bg-white flex items-center justify-center group shadow-md">
            <img src={data.image} alt="Portrait Preview" className="h-full object-contain" />
            <div className="absolute inset-0 bg-stone-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={removePhoto}
                className="bg-red-600 p-3 text-white rounded-xl hover:bg-red-700 shadow-lg transition-all flex items-center gap-1.5 font-bold uppercase tracking-widest text-[9px] cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Remove Photo
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-stone-300 rounded-2xl hover:border-stone-600 hover:bg-stone-100/50 cursor-pointer transition-all">
            <div className="p-3 bg-stone-100 text-stone-400 rounded-full mb-2">
              <Upload className="w-6 h-6 text-stone-500" />
            </div>
            <span className="text-xs font-bold text-stone-700">Select Portrait File</span>
            <span className="text-[10px] text-stone-500 mt-1">PNG, JPG or WEBP up to 4MB</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        )}
        <p className="text-[10px] text-stone-400 leading-snug">
          *If you do not attach a photo, our custom artistic vector silhouette matching the active theme will render dynamically.
        </p>
      </div>
    </div>
  );
};
