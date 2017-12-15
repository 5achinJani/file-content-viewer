import React from "react";

export const FileContentList = ({ content, page }) => {
  if (!content) {
    return <span>No content to display.</span>;
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
    <span>
      <table align="center">
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
      </table>
    </span>
  );
};
