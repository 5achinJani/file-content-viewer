import React from "react";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import FontAwesome from "react-fontawesome";

export const FileContentPagination = ({ page, totalPage, onPaginate }) => {
  if (!totalPage) {
    return null;
  }
  const prevNext = number => {
    if (number < 1 || number > totalPage) {
      return false;
    } else if (page === number) {
      return false;
    }
    onPaginate(number);
  };
  return (
    <React.Fragment>
      <Pagination className="justify-content-center">
        <PaginationItem
          disabled={page === 1}
          title="Go to beginner of file"
          onClick={() => {
            onPaginate(1);
          }}
        >
          <PaginationLink>
            <FontAwesome name="angle-double-left" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          disabled={page - 1 < 1}
          title="Previous 10 lines"
          onClick={() => {
            prevNext(page - 1);
          }}
        >
          <PaginationLink>
            <FontAwesome name="angle-left" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          disabled={page + 1 > totalPage}
          title="Next 10 lines"
          onClick={() => {
            prevNext(page + 1);
          }}
        >
          <PaginationLink>
            <FontAwesome name="angle-right" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          disabled={page === totalPage}
          title="Go to end of file"
          onClick={() => {
            onPaginate(totalPage);
          }}
        >
          <PaginationLink>
            <FontAwesome name="angle-double-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </React.Fragment>
  );
};
