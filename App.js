import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './colors';
import React, { useState } from 'react';

// TouchableOpacity : 누르는 이벤트를 listen할 준비가 된 View.
// Opacity가 있는 이유는 여기에 애니메이션 효과가 있기 때문!

// TouchableHighlight : 위의 TouchableOpacity보다 더 많은 속성들이 있다.
// 예를들어, 클릭했을 때의 투명도를 설정할 수 있다.
// onPress, underlayColor, activeOpacity 등등의 속성

// TouchableWithoutFeedback : Touchable 컴포넌트인데, 화면의 가장 위에서 일어나는 탭 이벤트를 listen한다.
// 그래픽이나 다른 UI반응은 보여주지 않는다. 아무 변화도 주고싶지 않을 때 주로 사용!

// Pressable이라는 것도 있는데, 추후 미래 확장성을 고려한다면 이 친구를 사용해보라고 한다,,(?)

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (e) => setText(e);
  const addTodo = () => {
    if(text === "") {
      return;
    }
    // Object.assign(타겟(새로 만들어질 객체 = {}), 소스1(이전 toDos), 소스2(새 친구들))
    // Object.assign말고도 ...을 이용해서도 할 수 있다!
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working },
    }
    setToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color:working ? "white": theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color:!working ? "white": theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
          <TextInput 
          onSubmitEditing={addTodo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working? "할 일을 입력하세요!!" : "어디로 여행가고 싶으신가요?"} 
          style={styles.input}/>
          <ScrollView>
            {Object.keys(toDos).map((key) => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
        ))}
          </ScrollView>
    </View>
  );
}

//활성화된 버튼 하얀색, 비활성화된 버튼은 회색
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:25,
  },
  header: {
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:100,

  },
  btnText: {
    fontSize:38,
    fontWeight:"600"
  },
  input: {
    backgroundColor:"white",
    paddingVertical:15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
