import React from "react";

interface UploadFileProps {
  onFileSelect: (file: File) => void;
}

export function UploadFile({ onFileSelect }: UploadFileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="block text-sm text-foreground"
    />
  );
}
