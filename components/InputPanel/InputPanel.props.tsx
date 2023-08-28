export interface InputPanelProps {
  inputPanelText: string;
  inputPanelButtonText: string;
  inputPanelButtonDisabled: boolean;
  addAndUpdateTodoList: () => void;
  onChangeText: (state: any) => void;
};
