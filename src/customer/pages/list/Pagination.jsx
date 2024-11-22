import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  searchParams,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  };
  const handlePageChange = (page) => {
    searchParams.set("page", page - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    onPageChange(page);
  };

  const handleClick = (i) => {
    handlePageChange(i);
    scrollToTop();
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li>
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`page-link ${currentPage == i ? "active" : ""}`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <nav aria-label="Page navigation">
        <ul className="flex">
          {/* Previous button */}
          <li className="mx-1">
            <button
              className="py-2 px-4 bg-blue-300 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {renderPagination()}

          {/* Next button */}
          <li className="mx-1">
            <button
              className="py-2 px-4 bg-blue-300 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out"
              aria-label="Next"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
