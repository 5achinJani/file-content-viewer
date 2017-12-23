import React from "react";
import ReactDOM from "react-dom";

import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("updates the value of input to state", () => {
  const fileName = "file.txt";
  const event = {
    target: {
      value: fileName
    }
  };
  const component = shallow(<App />);
  component.instance().handleChange(event);
  expect(component.state("file").fileName).toBe(fileName);
});

it("updates the isLoading to state", async () => {
  const component = shallow(<App />);
  await component.instance().setLoading(true);
  expect(component.state("file").isLoading).toBe(true);
  await component.instance().setLoading(false);
  expect(component.state("file").isLoading).toBe(false);
});
