import React from "react";

export const FileContentPagination = ({ page, totalPage, onPaginate }) => {
  if (!totalPage) {
    return null;
  }
  const prevNext = number => {
    if (number < 1 || number > totalPage) {
      return false;
    }
    onPaginate(number);
  };
  return (
    <span>
      <button
        title="Go to beginner of file"
        onClick={() => {
          onPaginate(1);
        }}
      >
        {" "}
        |&lt;{" "}
      </button>
      &nbsp;
      <button
        title="Previous 10 lines"
        onClick={() => {
          prevNext(page - 1);
        }}
      >
        {" "}
        &lt;{" "}
      </button>
      &nbsp;
      <button
        title="Next 10 lines"
        onClick={() => {
          prevNext(page + 1);
        }}
      >
        {" "}
        &gt;{" "}
      </button>
      &nbsp;
      <button
        title="Go to end of file"
        onClick={() => {
          onPaginate(totalPage);
        }}
      >
        {" "}
        |&gt;{" "}
      </button>
    </span>
  );
};
