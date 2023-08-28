import { StyleSheet } from "react-native";
import { palette } from "../styles/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 60
  },
  settingsTitle: {
    fontSize: 24,
    marginBottom: 28,
  },
  settingsButton: {
    backgroundColor: palette.blue,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30
  },
  settingsButtonText: {
    color: palette.white,
    fontSize: 20,
    fontWeight: "bold"
  }
});
