// 데이터 입력과 관련된 코드를 모아놓음
import { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";

function GoalInput(props) {
  const [inputText, setInputText] = useState("");

  function goalInputHandler(Text) {
    setInputText(Text);
  }

  function addGoalHandler() {
    props.onAddGoal(inputText);
    setInputText("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="목표를 입력하세요!"
        onChangeText={goalInputHandler}
        value={inputText}
      />
      <Button title="목표 추가하기" onPress={addGoalHandler} />
      {/* 버튼의 경우 style 속성을 적용할 수 없다. 그렇기 때문에 다른 방법으로 수정 
        inputContainer의 alignItems를 수정하여 버튼이 늘어나지 않도록 함 */}
    </View>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%", // 사용할 수 있는 너비의 80%를 쓸 수 있다.
    marginRight: 8,
    padding: 8,
  },
});
