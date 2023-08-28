import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { InputPanelProps as InputPanelProps } from "./InputPanel.props";
import { styles } from "./InputPanel.styles";
import { palette } from "../../styles/Color";

export function InputPanel(props: InputPanelProps) {
    const { inputPanelText, inputPanelButtonDisabled, inputPanelButtonText, addAndUpdateTodoList, onChangeText } = props;
    return (
        <View style={styles.inputPanelWrap}>
            <View style={styles.colset}>
                <View style={styles.col1}>
                    <TextInput
                        testID="inputPanelInput"
                        style={styles.inputPanelInput}
                        onChangeText={text => onChangeText(text)}
                        value={inputPanelText} placeholder="Enter here"
                        placeholderTextColor={palette.gray} />
                </View>

                <View style={styles.col2}>
                    <TouchableOpacity
                        testID="inputPanelButton"
                        disabled={inputPanelButtonDisabled}
                        style={[styles.inputPanelButton, inputPanelButtonDisabled ? styles.inputPanelButtonDisabled : null]}
                        onPress={() => addAndUpdateTodoList()}>
                        <Text style={styles.inputPanelButtonText}>{inputPanelButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
