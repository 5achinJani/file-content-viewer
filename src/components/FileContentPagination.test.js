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
  const endBtn = component.find('[name="js-item-end"]');
  const exec = btn => {
    expect(btn.props().disabled).toBeFalsy();
    btn.simulate("click");
    expect(props.onPaginate).toHaveBeenCalled();
  };
  exec(nextBtn);
  exec(endBtn);
});

it("should not paginate: next & end", () => {
  const props = {
    page: 1,
    totalPage: 1,
    onPaginate: jest.fn()
  };
  const component = shallow(<FileContentPagination {...props} />);
  const nextBtn = component.find('[name="js-item-next"]');
  const endBtn = component.find('[name="js-item-end"]');
  const exec = btn => {
    expect(btn.props().disabled).toBeTruthy();
    btn.simulate("click");
    expect(props.onPaginate).not.toHaveBeenCalled();
  };
  exec(nextBtn);
  exec(endBtn);
});

it("should paginate: back & start", () => {
  const props = {
    page: 3,
    totalPage: 3,
    onPaginate: jest.fn()
  };
  const component = shallow(<FileContentPagination {...props} />);
  const backBtn = component.find('[name="js-item-back"]');
  const startBtn = component.find('[name="js-item-start"]');
  const exec = btn => {
    expect(btn.props().disabled).toBeFalsy();
    btn.simulate("click");
    expect(props.onPaginate).toHaveBeenCalled();
  };
  exec(backBtn);
  exec(startBtn);
});

it("should not paginate: back & start", () => {
  const props = {
    page: 1,
    totalPage: 1,
    onPaginate: jest.fn()
  };
  const component = shallow(<FileContentPagination {...props} />);
  const backBtn = component.find('[name="js-item-back"]');
  const startBtn = component.find('[name="js-item-start"]');
  const exec = btn => {
    expect(btn.props().disabled).toBeTruthy();
    btn.simulate("click");
    expect(props.onPaginate).not.toHaveBeenCalled();
  };
  exec(backBtn);
  exec(startBtn);
});
