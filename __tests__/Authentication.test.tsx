import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { getEnrolledLevelAsync, authenticateAsync, hasHardwareAsync } from "expo-local-authentication";
import { Authentication } from "../screens/Authentication";
import "@testing-library/jest-native/extend-expect";

jest.mock("expo-local-authentication", () => ({
  authenticateAsync: jest.fn(),
  getEnrolledLevelAsync: jest.fn()
    .mockResolvedValueOnce(0)
    .mockResolvedValueOnce(2),
  hasHardwareAsync: jest.fn(),
  cancelAuthenticate: jest.fn()
}));

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

describe("Authetication screen", () => {
  let props: any;
  props = createTestProps({});

  it("should check the security level when the user clicks the button", async () => {
    const { getByTestId } = render(<Authentication {...props} />);
    const settingsButton = getByTestId("settingsButton");
    fireEvent.press(settingsButton);
    expect(getEnrolledLevelAsync).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(hasHardwareAsync).toHaveBeenCalledTimes(1);
      expect(authenticateAsync).toHaveBeenCalledTimes(0);
    });
  });

  it("should link to authenticate screen when security level is FACIAL_RECOGNITION (2)", async () => {
    const { getByTestId } = render(<Authentication {...props} />);
    const settingsButton = getByTestId("settingsButton");
    getEnrolledLevelAsync();
    fireEvent.press(settingsButton);
    await waitFor(() => expect(authenticateAsync).toHaveBeenCalledTimes(1));
  });

});
