import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, 
TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { theme } from './colors';
import React from 'react';

// TouchableOpacity : 누르는 이벤트를 listen할 준비가 된 View.
// Opacity가 있는 이유는 여기에 애니메이션 효과가 있기 때문!

// TouchableHighlight : 위의 TouchableOpacity보다 더 많은 속성들이 있다.
// 예를들어, 클릭했을 때의 투명도를 설정할 수 있다.
// onPress, underlayColor, activeOpacity 등등의 속성

// TouchableWithoutFeedback : Touchable 컴포넌트인데, 화면의 가장 위에서 일어나는 탭 이벤트를 listen한다.
// 그래픽이나 다른 UI반응은 보여주지 않는다. 아무 변화도 주고싶지 않을 때 주로 사용!

// Pressable이라는 것도 있는데, 추후 미래 확장성을 고려한다면 이 친구를 사용해보라고 한다,,(?)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight
        activeOpacity={0.1} 
        underlayColor="#DDDDDD"
        onPress={() => console.log("pressed")}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
      </View>
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
    fontWeight:"600",
    color:"white",
  },
});
