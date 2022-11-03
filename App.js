import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [goals, setGoals] = useState([]);

  function goalInputHandler(Text) {
    setInputText(Text);
  }

  function addGoalHandler() {
    setGoals((currentCourseGoals) => [...currentCourseGoals, {text: inputText, key: Math.random().toString()}, ]);
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

      {/* 항목 수백 또는 수천개일 경우 안에 있는 항목을 전부 렌더링하기 때문에 ScrollView는 성능에 문제가 생길 수 있다. */}
      <View style={styles.goalsContainer}>
        <Text>목표 목록</Text> 
        <FlatList data={goals} renderItem={(itemData) => {
          return (
             <View style={styles.goalItem}>
              <Text style={styles.goalText}>{itemData.item.text}</Text>
              {/* item 프로퍼티, 렌더링 되는 각 목록 항목에 대해 실제 데이터 항목을 하나씩 가진다. 다양한 데이터 항목에 명칭.item 으로 접근한다.
              key 프로퍼티는 이제 목록을 수동으로 매핑하지 않기 때문에 삭제해도 된다.(나중에 다시 다룰 예정) 
              FlatList사용 시 목록 항목에 키를 추가하는 주요 방법 2가지 중 데이터의 값을 data={goals}같은 원시 값에서 key 프로퍼티를 포함하는 객체로 변경하는 것 
              text 프로퍼티를 가진 객체로 모든 항목을 설정해주었으므로 text프로퍼티에 접근해서 데이터를 얻어오면 된다. 
              나머지 한 가지 방법은 입력 데이터에 key 프로퍼티를 설정하는 것이다. FlatList 컴포넌트에 KeyExtractor 프로퍼티를 추가한다.*/}
            </View>
          )
        }} /> 
        {/* data 프로퍼티 : 출력할 데이터를 지정 & renderItem 개별 데이터를 어떻게 렌더링 할지(FlatList는 콘텐츠를 전달할 때 열고 닫는 텍스트사이에 넣지 않음) */}
        {/* renderItem 프로퍼티는 개별 데이터 항목을 렌더링 하는 방법을 FlatList에 지시하는 함수를 값으로 갖는 프로퍼티, 함수는 자동으로 개별 항목을 매개변수로 받는다.*/}
        {/* Text를 View로 감싸면 IOS에는 Text에 바로 특정 CSS가 적용되지 않는것을 해결 가능(공식문서에 나옴) */}
        {/* 이런 경우에는 React Native에 내장된 FlatList를 사용하는 것이다. 화면 밖의 요소들은 스크롤해야 렌더링 됨 */}
        {/* 데이터를 수동으로 매핑하는 대신 FlatList로 전달해서 필요 사항만 렌더링 하는 방식으로 변경 */}
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
  },
  goalItem : {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color:'white'
  }
});