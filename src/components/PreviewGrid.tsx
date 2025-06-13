import folder from "../assets/folder.png";

const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/bmp"];

interface PreviewGridProps {
  images: File[];
}

const PreviewGrid = ({ images }: PreviewGridProps) => {
  if (images.length === 0) {
    return (
      <div className="col-span-full text-center opacity-70 mt-6">
        <img
          src={folder}
          alt="Nenhuma imagem selecionada"
          className="mx-auto max-w-xs"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map((img, idx) => {
        const isValid = SUPPORTED_TYPES.includes(img.type);

        return (
          <div
            key={idx}
            className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition ${
              isValid ? "bg-white" : "bg-red-100"
            }`}
          >
            <img
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="w-full h-40 object-cover"
            />
            <div className="px-3 py-2">
              <p className="text-sm text-gray-600 truncate">{img.name}</p>
              {!isValid && (
                <p className="text-xs text-red-600 font-semibold">
                  Formato inválido
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewGrid;
