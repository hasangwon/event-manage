import React from "react";

interface PaginationProps {
  currentPage: number;
  eventsPerPage: number;
  totalEvents: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, eventsPerPage, totalEvents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="h-20 flex justify-center items-center space-x-2 pb-4">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={(event) => {
                event.preventDefault();
                paginate(number);
              }}
              className={`px-4 py-2 rounded border ${currentPage === number ? "bg-blue-500 text-white" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
