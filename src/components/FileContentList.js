import React from "react";

import { Table } from "reactstrap";
import FontAwesome from "react-fontawesome";

export const FileContentList = ({ content, page, isLoading }) => {
  if (isLoading) {
    return (
      <React.Fragment>
        Loading content..
        <FontAwesome name="spinner" spin={true} />
      </React.Fragment>
    );
  }
  if (!content) {
    return <React.Fragment>No content to display.</React.Fragment>;
  }

  const getLineNumber = index => {
    const prefix = page - 1;
    const suffix = index + 1;
    let result = `${prefix}${suffix}`;
    if (suffix === 10) {
      result = `${page}0`;
    }
    return result;
  };

  return (
    <React.Fragment>
      <Table responsive={true}>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
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
