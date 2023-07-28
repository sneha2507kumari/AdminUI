import React from "react";
import "./PaginationPage.css";

const PaginationPage = ({
  currentPage,
  totalPages,
  handlePageChange,
  handleDeleteSelected,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <div className="delete-selected">
        <button
          onClick={handleDeleteSelected}
          disabled={currentPage < 1}
          aria-label="Delete Selected"
        >
          Delete Selected
        </button>
      </div>
      <ul className="page-buttons">
        <li>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="First Page"
          >
            &lt;&lt;
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => handlePageChange(number)}
              className={currentPage === number ? "active" : ""}
              aria-label={`Page ${number}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            &gt;
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last Page"
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationPage;

