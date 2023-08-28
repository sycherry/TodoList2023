import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Home } from "../screens/Home";
import "@testing-library/jest-native/extend-expect";
import { InputMode } from "../models/InputMode";

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

describe("Home screen", () => {
  let props: any;
  props = createTestProps({});

  it("should disable the button when the input is empty", async () => {
    const { getByTestId } = render(<Home {...props} />);
    const text = "";
    const input = getByTestId("inputPanelInput");
    fireEvent.changeText(input, text);
    const button = getByTestId("inputPanelButton");

    expect(button).toBeDisabled();
  });

  it("should enabled the button when the user enters text", async () => {
    const { getByTestId } = render(<Home {...props} />);
    const text = "Forth Item";
    const input = getByTestId("inputPanelInput");
    fireEvent.changeText(input, text);
    const button = getByTestId("inputPanelButton");

    expect(button).toBeEnabled();
  });

  it("should create one item", async () => {
    const { getByTestId, getAllByTestId } = render(<Home {...props} />);
    const text = "Forth Item";
    const input = getByTestId("inputPanelInput");
    const button = getByTestId("inputPanelButton");
    fireEvent.changeText(input, text);
    fireEvent.press(button);
    const forthList = getAllByTestId("list")[3];

    expect(forthList).toHaveTextContent("Forth Item");
    expect(button).toHaveTextContent(InputMode.ADD);
    expect(button).toBeDisabled();
  });

  it("should create two items", async () => {
    const { getByTestId, getAllByTestId } = render(<Home {...props} />);
    const text = "Forth Item";
    const text2 = "Fifth Item";
    const input = getByTestId("inputPanelInput");
    const button = getByTestId("inputPanelButton");

    fireEvent.changeText(input, text);
    fireEvent.press(button);
    fireEvent.changeText(input, text2);
    fireEvent.press(button);

    const forthList = getAllByTestId("list")[3];
    const fifthList = getAllByTestId("list")[4];

    expect(forthList).toHaveTextContent("Forth Item");
    expect(fifthList).toHaveTextContent("Fifth Item");
    expect(button).toHaveTextContent(InputMode.ADD);
    expect(button).toBeDisabled();
  });

  it("should remove the first item", async () => {
    const { getAllByTestId, queryByText } = render(<Home {...props} />);
    const removeButton = getAllByTestId("delete")[0];
    fireEvent.press(removeButton);

    expect(queryByText("First Item")).toBeNull();
  });

  it("should create a new item and then remove it", async () => {
    const { getByTestId, getAllByTestId, queryByText } = render(<Home {...props} />);
    const text = "Forth Item";
    const input = getByTestId("inputPanelInput");
    fireEvent.changeText(input, text);
    const button = getByTestId("inputPanelButton");
    fireEvent.press(button);
    const removeButton = getAllByTestId("delete")[3];
    fireEvent.press(removeButton);

    expect(queryByText("Forth Item")).toBeNull();
  });

  it("should update the first item", async () => {
    const { getAllByTestId, getByTestId } = render(<Home {...props} />);

    const firstList = getAllByTestId("list")[0];
    fireEvent.press(firstList);

    const button = getByTestId("inputPanelButton");
    expect(button).toHaveTextContent(InputMode.UPDATE);

    const updateInput = getByTestId("inputPanelInput");
    const updateText = "First Item Updated";
    fireEvent.changeText(updateInput, updateText);
    fireEvent.press(button);

    expect(firstList).toHaveTextContent("First Item Updated");
    expect(button).toHaveTextContent(InputMode.ADD);
    expect(button).toBeDisabled();
  });


  it("should create and a new item and update it", async () => {
    const { getByTestId, getAllByTestId } = render(<Home {...props} />);

    const text = "Forth Item";
    const input = getByTestId("inputPanelInput");
    const button = getByTestId("inputPanelButton");

    fireEvent.changeText(input, text);
    fireEvent.press(button);

    const forthList = getAllByTestId("list")[3];
    fireEvent.press(forthList);

    expect(button).toHaveTextContent(InputMode.UPDATE);

    const updateInput = getByTestId("inputPanelInput");
    const updateText = "Forth Item Updated";
    fireEvent.changeText(updateInput, updateText);
    fireEvent.press(button);

    expect(forthList).toHaveTextContent("Forth Item Updated");
    expect(button).toHaveTextContent(InputMode.ADD);
    expect(button).toBeDisabled();
  });

});