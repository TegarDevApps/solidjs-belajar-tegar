type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;

  const renderPageButtons = () => {
    const pageButtons = [];

    // First page
    pageButtons.push(
      <button
        onClick={() => onPageChange(1)}
        class={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
          currentPage === 1
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        1
      </button>
    );

    // Ellipsis for skipped pages at the beginning
    if (currentPage > 3) {
      pageButtons.push(
        <span class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          ...
        </span>
      );
    }

    // Pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i <= 1 || i >= totalPages) continue; // Skip if already handled by first or last page
      pageButtons.push(
        <button
          onClick={() => onPageChange(i)}
          class={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            currentPage === i
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis for skipped pages at the end
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <span class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          ...
        </span>
      );
    }

    // Last page
    if (totalPages > 1) {
      pageButtons.push(
        <button
          onClick={() => onPageChange(totalPages)}
          class={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div class="flex items-center justify-center py-6">
      <nav class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          class={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        {/* Page numbers */}
        {renderPageButtons()}

        {/* Next button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          class={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;