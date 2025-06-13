import { IconPhotoPlus } from "@tabler/icons-react";

interface ImageUploaderProps {
  onImagesSelected: (images: File[]) => void;
}

const ImageUploader = ({ onImagesSelected }: ImageUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    onImagesSelected(files);
  };

  return (
    <label
      htmlFor="folder-upload"
      className="inline-flex items-center gap-3 bg-white border border-blue-300 text-blue-700 px-6 py-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
    >
      <IconPhotoPlus size={24} />
      Selecionar Pasta
      <input
        id="folder-upload"
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ImageUploader;
