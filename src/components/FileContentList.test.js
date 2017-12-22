import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import {
  FileContentList,
  ContentLoader,
  ContentNotAvail,
  generateLineNo
} from "./FileContentList";

it("should render", () => {
  const props = {
    content: ["test"],
    page: 1,
    isLoading: false
  };
  const component = renderer.create(<FileContentList {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should generate correct line number based on page number and current line of content", () => {
  let params = {
    page: 1,
    index: 3
  };
  let lineNo = generateLineNo(params);
  expect(lineNo).toBe("04");

  params = {
    page: 1,
    index: 9
  };
  lineNo = generateLineNo(params);
  expect(lineNo).toBe("10");

  params = {
    page: 2,
    index: 5
  };
  lineNo = generateLineNo(params);
  expect(lineNo).toBe("16");

  params = {
    page: 11,
    index: 0
  };
  lineNo = generateLineNo(params);
  expect(lineNo).toBe("101");
});

it("should show loading component when loading", () => {
  const props = {
    content: [],
    page: 1,
    isLoading: true
  };
  const component = shallow(<FileContentList {...props} />);
  expect(component.equals(<ContentLoader />)).toBe(true);
});

it("should show empty content placeholder message when content is empty", () => {
  const props = {
    content: [],
    page: 1,
    isLoading: false
  };
  const component = shallow(<FileContentList {...props} />);
  expect(component.equals(<ContentNotAvail />)).toBe(true);
});
