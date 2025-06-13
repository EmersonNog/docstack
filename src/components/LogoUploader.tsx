import React from "react";

interface LogoUploaderProps {
  label: string;
  onFilesSelected: (files: File[]) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({
  label,
  onFilesSelected,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto lg:mx-0 mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="block w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white shadow-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default LogoUploader;
