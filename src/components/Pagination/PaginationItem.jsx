import React, { useContext } from "react";
import cls from "./pagination.module.scss";
import { Context } from "../SubmitPart/Submit";

const PaginationItem = () => {
  const { todos, postsPerPage, setCurrentPage, setPostsPerPage, currentPage } =
    useContext(Context);
  // Pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(todos.length / postsPerPage); i++) {
    pages.push(i);
  }
  const handleNextClick = () => {
    if (currentPage < pages.length) {
      setCurrentPage((old) => old + 1);
    }
  };
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage((old) => old - 1);
    }
  };
  
  // Return
  return (
    <div className={cls.pagination_wrapper}>
      <button
        className={cls.prev}
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        <box-icon color="#fff" rotate="180" name="last-page"></box-icon>
      </button>
      <input
        className={cls.numberInput}
        type="number"
        onChange={(e) => setPostsPerPage(e.target.value)}
        value={postsPerPage}
      />
      {pages.map((page, i) => {
        const isActive = page == currentPage;

        return (
          <button
            key={i}
            onClick={() => setCurrentPage(page)}
            className={isActive ? `${cls.active} ${cls.pages}` : cls.pages}
          >
            {page}
          </button>
        );
      })}
      <button
        className={cls.next}
        onClick={handleNextClick}
        disabled={currentPage >= pages.length}
      >
        <box-icon color="#fff" name="last-page"></box-icon>
      </button>
    </div>
  );
};

export default PaginationItem;
