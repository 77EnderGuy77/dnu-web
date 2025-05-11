// src/components/pagination.tsx
import React from "react";
import "../css/pagination.css";

type PageItem = number | "ellipsis";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage = 9,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageItems = (): PageItem[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: PageItem[] = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, "ellipsis", totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, 2, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages
      );
    }
    return pages;
  };

  const pageItems = getPageItems();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageItems.map((item, idx) =>
        item === "ellipsis" ? (
          <span key={`e-${idx}`} className="ellipsis">
            …
          </span>
        ) : (
          <button
            key={item}
            className={item === currentPage ? "active" : ""}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};
