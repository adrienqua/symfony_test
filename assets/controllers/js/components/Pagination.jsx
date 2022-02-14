import React from "react";

const Pagination = (props) => {
  const { currentPage, itemsPerPage, length, onPageChanged } = props;

  const pageCount = Math.ceil(length / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={"page-item" + (currentPage === 1 ? " disabled" : "")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li
            className={"page-item" + (currentPage === page ? " active" : "")}
            key={page}
          >
            <button
              className="page-link"
              href="#"
              onClick={() => onPageChanged(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={
            "page-item" + (currentPage === pageCount ? " disabled" : "")
          }
        >
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
            href="#"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

export default Pagination;
