import { StyleSheet } from "react-native";
import { palette } from "../../styles/Color";

export const styles = StyleSheet.create({
    inputPanelWrap: {
        zIndex: 2,
        width: "100%",
        backgroundColor: palette.lightGray,
        position: "absolute",
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 15,
    },
    colset: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: palette.white,
        borderRadius: 18,
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    col1: {
        width: "60%",
    },
    col2: {
        paddingLeft: 10,
        width: "auto",
    },
    inputPanelInput: {
        fontSize: 16,
        color: palette.black,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: palette.lightGray,
    },
    inputPanelButton: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: palette.blue,
        borderRadius: 18,
    },
    inputPanelButtonText: {
        textAlign: "center",
        fontWeight: "bold",
        color: palette.white,
    },
    inputPanelButtonDisabled: {
        backgroundColor: palette.lightBlue,
    }
});
