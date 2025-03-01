export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const renderPageNumbers = () => {
    let pages = [] as (number | string)[];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      if (currentPage > 3) {
        pages.push("...");
      }

      const middlePages = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ].filter((page) => page > 1 && page < totalPages);

      pages = [...pages, ...middlePages];

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          className={`px-3 py-1 rounded-md ${
            currentPage === page ? "bg-orange-500 text-white" : "text-black"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-2">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 text-black disabled:opacity-50"
      >
        {"<<"}
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 text-black disabled:opacity-50"
      >
        {"<"}
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 text-black disabled:opacity-50"
      >
        {">"}
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2 text-black disabled:opacity-50"
      >
        {">>"}
      </button>
    </div>
  );
}
