import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [goals, setGoals] = useState([]);

  function goalInputHandler(Text) {
    setInputText(Text);
  }

  function addGoalHandler() {
    setGoals((currentCourseGoals) => [...currentCourseGoals, {text: inputText, id: Math.random().toString()}, ]);
    // 전달하는 매개변수는 react가 알아서 설정
    // 실제 목표 텍스트를 포함하는 text 프로퍼티 추가 & key 프로퍼티도 추가해서 고유 키로 설정 이 때 난수를 생성해서 사용(중복이 있을 순 있지만 일단 이렇게 고)
    // FlatList는 데이터 배열의 데이터가 객체 목록일 때 더 잘 작동한다. 데이터로 객체 목록이 있고 모든 객체에 key 프로퍼티가 있으면 자동으로 key도 적용됨
  }

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
        <FlatList data={goals} renderItem={(itemData) => {
          return <GoalItem text={itemData.item.text}/>
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1, // 제일 바깥의 컨테이너가 1개 뿐이므로 외부 컨테이너가 전체 높이를 차지함
    // 이후 내부 컨테이너들이 비율을 1:3으로 나눠서 가짐!
    paddingTop: 50,
    backgroundColor:'#fff8dc'
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