import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";
import "@testing-library/jest-native/extend-expect";

describe("App", () => {
  it("should show authentication screen when starting app", async () => {
    const { getByText } = render(<App />);
    const text = getByText("Set Authentication to Proceed");
    expect(text).toHaveTextContent("Set Authentication to Proceed");
  });
});
