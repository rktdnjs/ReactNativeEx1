import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import React, { useState, useEffect } from 'react';

//setItem을 위해 필요한 key값을 따로 선언하였음.
const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (e) => setText(e);

    //앱이 로딩될 때 useEffect 실행!
    useEffect(() => {
      loadToDos();
    }, []);  

  const addTodo = async() => {
    if(text === "") {
      return;
    }
    // Object.assign(타겟(새로 만들어질 객체 = {}), 소스1(이전 toDos), 소스2(새 친구들))
    // Object.assign말고도 ...을 이용해서도 할 수 있다!
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working },
    }
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  console.log(toDos);

  //key와 value를 넣어주어야 하는데, value는 string형태여야 한다!
  //setItem은 promise를 반환하기 때문에, await를 사용할 수 있고 이 때 async도 써주어야 함!
  //toSave형태의 toDos를 전달받을 것인데, 여기서 object를 string형태로 변환해주는 과정 거침
  //최종적으로 key와 string형태의 value를 저장!
  const saveToDos = async(toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  //getItem은 String을 줄 것이기 때문에 이를 다시 object형태로 바꾸어주어야 한다.
  //그러기 위해서는 JSON.parse를 사용해야 함!!
  //로딩 될 때 실행되도록 useEffect를 따로 상단에 작성해 주었음.
  //참고로, 이부분에 만약 에러가 생긴다면 try catch문을 곁들여보세용
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s !== null ? setToDos(JSON.parse(s)) : null;
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
 
          {/* working의 값에 따라 보여주는 내용이 다름 */}
          <ScrollView>
            {Object.keys(toDos).map((key) => (
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            ) : null
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

// TouchableOpacity : 누르는 이벤트를 listen할 준비가 된 View.
// Opacity가 있는 이유는 여기에 애니메이션 효과가 있기 때문!

// TouchableHighlight : 위의 TouchableOpacity보다 더 많은 속성들이 있다.
// 예를들어, 클릭했을 때의 투명도를 설정할 수 있다.
// onPress, underlayColor, activeOpacity 등등의 속성

// TouchableWithoutFeedback : Touchable 컴포넌트인데, 화면의 가장 위에서 일어나는 탭 이벤트를 listen한다.
// 그래픽이나 다른 UI반응은 보여주지 않는다. 아무 변화도 주고싶지 않을 때 주로 사용!

// Pressable이라는 것도 있는데, 추후 미래 확장성을 고려한다면 이 친구를 사용해보라고 한다,,(?)