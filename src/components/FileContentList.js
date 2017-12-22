import React from "react";

import { Table } from "reactstrap";
import FontAwesome from "react-fontawesome";

export const FileContentList = ({ content, page, isLoading }) => {
  if (isLoading) {
    return <ContentLoader />;
  }
  if (!content || !content.length) {
    return <ContentNotAvail />;
  }

  const getLineNumber = index => {
    return generateLineNo({ page, index });
  };

  return (
    <React.Fragment>
      <Table responsive={true}>
        <thead>
          <tr>
            <th>#</th>
            <th />
          </tr>
        </thead>
        <tbody name="js-content-list">
          {content.map((value, index) => {
            return (
              <tr key={index}>
                <td>{getLineNumber(index)}:</td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export const ContentLoader = () => {
  return (
    <div>
      Loading content..
      <FontAwesome name="spinner" spin={true} />
    </div>
  );
};

export const ContentNotAvail = () => {
  return <div>No content to display</div>;
};

export const generateLineNo = ({ page, index }) => {
  const prefix = page - 1;
  const suffix = index + 1;
  let result = `${prefix}${suffix}`;
  if (suffix === 10) {
    result = `${page}0`;
  }
  return result;
};
