import React, { FC, useState, useEffect } from "react";
import { Platform, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Text, View, FlatList, ListRenderItemInfo } from "react-native";
import { HomeProps } from "./Home.props";
import { initialData } from "./InitialData";
import { FontAwesome } from "@expo/vector-icons";
import { InputPanel } from "../components/InputPanel/InputPanel"
import { styles } from "./Home.styles";
import { TodoItem } from "../models/TodoItem";
import { InputMode } from "../models/InputMode";
import { palette } from "../styles/Color";

export const Home: FC<HomeProps> = () => {

  const [data, setData] = useState<TodoItem[]>(initialData);
  const [inputPanelText, setInputPanelText] = useState<string>("");
  const [inputPanelButtonText, setInputPanelButtonText] = useState<InputMode>(InputMode.ADD);
  const [inputPanelButtonDisabled, setInputPanelButtonDisabled] = useState<boolean>(true);
  const [updateID, setUpdateID] = useState<string>("");
  const [updateDisabled, setUpdateDisabled] = useState<boolean>(false);

  useEffect(() => {
    setInputPanelButtonDisabled(!inputPanelText);
  }, [inputPanelText]);

  const onChangeText = (text: any) => {
    setInputPanelText(text);
  };

  const generateId = () => {
    return Date.now().toString() + "_" + (Math.random() * 1e6).toFixed(0).toString();
  };

  const addAndUpdateTodoList = () => {
    if (inputPanelButtonText === InputMode.ADD) {
      setData([...data, { title: inputPanelText, id: generateId() }]);
    } else {
      const newData = data.map(item => {
        if (item.id == updateID) {
          return { title: inputPanelText, id: updateID };
        }
        return item;
      });
      setData(newData);
      setInputPanelButtonText(InputMode.ADD);
      setUpdateDisabled(false);
    }
    setInputPanelText("");
  };

  const removeTodoList = (id: string) => {
    setData(data => data.filter((data) => data.id !== id));
  };

  const updateTodoList = (id: string) => {
    const item = data.find((data) => data.id == id);
    if (item) {
      setInputPanelButtonText(InputMode.UPDATE);
      setInputPanelText(item.title);
      setUpdateID(item.id);
      setUpdateDisabled(true);
    };
  };

  const renderItem = ({ item }: ListRenderItemInfo<TodoItem>) => (
    <TouchableOpacity testID="list" disabled={updateDisabled} onPress={() => updateTodoList(item.id)} >
      <View style={styles.listOuter}>

        <View style={styles.listLeft}>
          <View style={styles.textOuter}>
            <View style={styles.circleIcon}></View>
            <Text testID="text" style={styles.itemText}>{item.title}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.removeItem} disabled={updateDisabled} testID="delete" onPress={() => removeTodoList(item.id)} >
          <FontAwesome name="trash-o" size={28} color={palette.gray} />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        {updateDisabled && <View style={styles.updateOverlay}></View>}

        <View style={styles.row}>
          <View style={styles.titleOuter}><Text style={styles.title}>TODO:</Text></View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={<View style={styles.listFooterBlock} />}
          />
        </View>

        <InputPanel
          inputPanelText={inputPanelText}
          onChangeText={onChangeText}
          inputPanelButtonText={inputPanelButtonText}
          inputPanelButtonDisabled={inputPanelButtonDisabled}
          addAndUpdateTodoList={addAndUpdateTodoList}
        />

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
