import { useState } from "react";
import { IconDownload } from "@tabler/icons-react";
import ImageUploader from "../components/ImageUploader";
import PaginationControls from "../components/PaginationControls";
import PreviewGrid from "../components/PreviewGrid";
import LogoUploader from "../components/LogoUploader";

const IMAGES_PER_PAGE = 6;

const ReportPhoto = () => {
  const [images, setImages] = useState<File[]>([]);
  const [fonte, setFonte] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [headerLogos, setHeaderLogos] = useState<File[]>([]);
  const [footerLogos, setFooterLogos] = useState<File[]>([]);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const handleGenerate = async () => {
    if (images.length > 0 && fonte.trim()) {
      const { generateDocx } = await import("../utils/generateDocx");
      generateDocx(images, fonte, headerLogos, footerLogos);
    } else {
      alert("Insira imagens e a fonte.");
    }
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-4 lg:pl-84 bg-gradient-to-br from-[#e8f2ff] via-[#e9faff] to-[#edf6ff]">
      <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Conheça o DocStack <br /> gerador de relatórios <br />
          fotográficos
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto lg:mx-0 mb-8">
          Carregue suas imagens em um clique e gere automaticamente um relatório
          fotográfico moderno.
        </p>

        <ImageUploader
          onImagesSelected={(files) => {
            setImages(files);
            setCurrentPage(1);
          }}
        />

        <LogoUploader
          label="Logomarcas (Cabeçalho)"
          onFilesSelected={setHeaderLogos}
        />

        <LogoUploader
          label="Logomarcas (Rodapé)"
          onFilesSelected={setFooterLogos}
        />

        <input
          type="text"
          value={fonte}
          onChange={(e) => setFonte(e.target.value)}
          placeholder="Fonte das imagens (ex: Prefeitura)"
          className="mt-6 w-full max-w-sm mx-auto lg:mx-0 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleGenerate}
          disabled={images.length === 0 || !fonte.trim()}
          className={`mt-6 inline-flex items-center gap-2 px-6 py-3 text-white text-lg font-semibold rounded-full transition shadow ${
            images.length === 0 || !fonte.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          <IconDownload size={20} />
          Gerar Relatório
        </button>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <PreviewGrid images={paginatedImages} />
        {images.length > 0 && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            {
              images.filter((img) =>
                ["image/jpeg", "image/png", "image/gif", "image/bmp"].includes(
                  img.type
                )
              ).length
            }{" "}
            imagem(ns) válida(s) e{" "}
            {
              images.filter(
                (img) =>
                  ![
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/bmp",
                  ].includes(img.type)
              ).length
            }{" "}
            inválida(s)
          </p>
        )}
        {images.length > IMAGES_PER_PAGE && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default ReportPhoto;
