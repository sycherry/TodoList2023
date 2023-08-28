import { StyleSheet } from "react-native";
import { palette } from "../styles/Color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingHorizontal: 15,
  },
  titleOuter: {
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: palette.blue,
  },
  listOuter: {
    backgroundColor: palette.white,
    paddingLeft: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  listLeft: {
    maxWidth: "68%",
  },
  textOuter: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleIcon: {
    width: 24,
    height: 24,
    backgroundColor: palette.blue,
    borderRadius: 12,
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: palette.gray,
    borderBottomColor: palette.gray,
  },
  removeItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: palette.lightGray,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  listFooterBlock: {
    height: 280,
  },
  updateOverlay: {
    zIndex: 1,
    backgroundColor: palette.black,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.6,
  },
});
