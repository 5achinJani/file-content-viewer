import React from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import FontAwesome from "react-fontawesome";

export const FileSearchBar = ({ file, handleSubmit, handleChange }) => {
  const { fileName, error, isLoading } = file;
  let valid = null;
  if (error) {
    valid = false;
  }
  return (
    <React.Fragment>
      <Form name="searchForm" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="filename">Enter file name to browse its content:</Label>
          <Input
            required={true}
            type="text"
            name="filename"
            id="filename"
            placeholder="file name"
            value={fileName}
            onChange={handleChange}
            valid={valid}
          />
          <FormFeedback name="js-error-text">{error ? error : ""}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Button name="js-btn-submit" type="submit" disabled={isLoading}>
            View {isLoading ? <FontAwesome name="spinner" spin={true} /> : null}
          </Button>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};
