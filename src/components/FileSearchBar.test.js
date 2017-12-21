import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { FileSearchBar } from "./FileSearchBar";

it("should render", () => {
  const props = {
    file: {
      fileName: "test",
      error: null,
      isLoading: false
    },
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
  };
  const component = renderer.create(<FileSearchBar {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should not submit when loading", () => {
  const props = {
    file: {
      fileName: "test",
      error: null,
      isLoading: true
    },
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
  };
  const component = shallow(<FileSearchBar {...props} />);
  const btnSubmit = component.find('[name="js-btn-submit"]');
  expect(btnSubmit.props().disabled).toBeTruthy();
  btnSubmit.simulate("click");
  expect(props.handleSubmit).not.toHaveBeenCalled();
});

it("should submit", () => {
  const props = {
    file: {
      fileName: "test",
      error: null,
      isLoading: false
    },
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
  };
  const component = shallow(<FileSearchBar {...props} />);
  const btnSubmit = component.find('[name="js-btn-submit"]');
  const form = component.find('[name="searchForm"]');
  expect(btnSubmit.props().disabled).toBeFalsy();
  form.simulate("submit");
  expect(props.handleSubmit).toHaveBeenCalled();
});

it("should show loading component when loading", () => {
  const props = {
    file: {
      fileName: "test",
      error: null,
      isLoading: true
    },
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
  };
  const component = shallow(<FileSearchBar {...props} />);
  const loader = component.find('[name="spinner"]');
  expect(loader.length).toBeTruthy();
});
