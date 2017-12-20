import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { FileContentPagination } from "./FileContentPagination";

it("should render pagination", () => {
  const props = {
    page: 2,
    totalPage: 5,
    onPaginate: jest.fn()
  };
  const component = renderer.create(<FileContentPagination {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should not render pagination", () => {
  const component = renderer.create(<FileContentPagination />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should paginate: next & end", () => {
  const props = {
    page: 1,
    totalPage: 3,
    onPaginate: jest.fn()
  };
  const component = shallow(<FileContentPagination {...props} />);
  const nextBtn = component.find('[name="js-item-next"]');
  const exec = (btn) => {
    expect(btn.props().disabled).toBeFalsy();
    btn.simulate("click");
    expect(props.onPaginate).toHaveBeenCalled();
  }
  exec(nextBtn);
});

it("should not paginate: next", () => {
  const props = {
    page: 1,
    totalPage: 1,
    onPaginate: jest.fn()
  };
  const component = shallow(<FileContentPagination {...props} />);
  const nextBtn = component.find('[name="js-item-next"]');
  expect(nextBtn.props().disabled).toBeTruthy();
  nextBtn.simulate("click");
  expect(props.onPaginate).not.toHaveBeenCalled();
});

it("should paginate: back", () => {
  const props = {
    page: 2,
    totalPage: 3,
    onPaginate: jest.fn()
  };
  const component = shallow(<FileContentPagination {...props} />);
  const backBtn = component.find('[name="js-item-back"]');
  expect(backBtn.props().disabled).toBeFalsy();
  backBtn.simulate("click");
  expect(props.onPaginate).toHaveBeenCalled();
});

