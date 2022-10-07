import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');

  function goalInputHandler(Text) {
    setInputText(Text);
  };

  function addGoalHandler() {
    console.log(inputText);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder='목표를 입력하세요!'
          onChangeText={goalInputHandler}
        />
        <Button title="목표 추가하기" onPress={addGoalHandler}/>
        {/* 버튼의 경우 style 속성을 적용할 수 없다. 그렇기 때문에 다른 방법으로 수정 
        inputContainer의 alignItems를 수정하여 버튼이 늘어나지 않도록 함 */}
      </View>

      <View style={styles.goalsContainer}>
        <Text>목표 목록</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1, // 제일 바깥의 컨테이너가 1개 뿐이므로 외부 컨테이너가 전체 높이를 차지함
    // 이후 내부 컨테이너들이 비율을 1:3으로 나눠서 가짐!
    paddingTop: 50,
    backgroundColor:'#7fffd4'
  },
  inputContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%', // 사용할 수 있는 너비의 80%를 쓸 수 있다. 
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5
  }
});