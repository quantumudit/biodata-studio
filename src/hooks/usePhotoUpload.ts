import type React from 'react';

interface UsePhotoUploadReturn {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: () => void;
}

export function usePhotoUpload(onChange: (image: string | null) => void): UsePhotoUploadReturn {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert('Selected photo exceeds the 4MB memory limit. Please select a lighter file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => onChange(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  return {
    handleFileChange,
    removePhoto: () => onChange(null),
  };
}
