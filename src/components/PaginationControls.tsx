import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`p-2 rounded-full transition ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <IconChevronLeft size={24} />
      </button>

      <span className="text-gray-700 font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full transition ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <IconChevronRight size={24} />
      </button>
    </div>
  );
};

export default PaginationControls;
