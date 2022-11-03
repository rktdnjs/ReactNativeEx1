import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);

  function addGoalHandler(inputText) {
    setGoals((currentCourseGoals) => [...currentCourseGoals, 
    {text: inputText, id: Math.random().toString()}, ]);
    // 전달하는 매개변수는 react가 알아서 설정
    // 실제 목표 텍스트를 포함하는 text 프로퍼티 추가 & key 프로퍼티도 추가해서 고유 키로 설정 이 때 난수를 생성해서 사용(중복이 있을 순 있지만 일단 이렇게 고)
    // FlatList는 데이터 배열의 데이터가 객체 목록일 때 더 잘 작동한다. 데이터로 객체 목록이 있고 모든 객체에 key 프로퍼티가 있으면 자동으로 key도 적용됨
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler}/>
      {/* addGoalHandler는 GoalInput의 onAddGoal에 값으로 전달됨 */}
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
  goalsContainer: {
    flex: 5
  }
});