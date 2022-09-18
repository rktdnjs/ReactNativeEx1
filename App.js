import * as React from 'react';
import * as Location from 'expo-location';
import * as Font from "expo-font";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
// import Constants from 'expo-constants';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY = "91466d74673c81a3f639ea04fea0d36a"; //안전한 방법은 아님, 원래는 서버에...!

//받은 데이터의 이름을 보내서 해당 아이콘의 이름에 맞게 변경해 줌
//강의와 다르게, Ionicons를 썼는데 그냥 Fontisto쓰는걸 추천 ㅎㅎ
const icons = {
  Clouds : "cloudy",
  Clear : "sunny-outline",
  Atmosphere: "cloudy",
  Snow: "snow",
  Rain: "rainy",
  Drizzle: "rainy",
  Thunderstorm: "thunderstorm",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true); //별 다른 사용은 x

  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted) { //유저가 위치 정보 권한 요청을 거절
      setOk(false);
    }

    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps:false}
      );
      setCity(location[0].region);

      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
      const json = await response.json();
      setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView 
      horizontal 
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}>
        {days.length === 0 ? 
        <View style={styles.day}>
          <ActivityIndicator color="white" style={{marginTop:10}} size="large"/>
        </View> : (
        days.map((day, index) => 
        <View key={index} style={styles.day}>
          {/* 여기서 toFixed는 소수점 1자리 까지라는 뜻 */}
          <View style={{flexDirection:"row", 
          alignItems:"center", 
          justifyContent:"space-between",
          width:"100%"}}>
            <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}도</Text>
            <Ionicons name={icons[day.weather[0].main]} size={70} color="white"/>
          </View>
          <Text style={styles.description}>{day.weather[0].main}</Text>
        </View>
        ))}
      </ScrollView>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  city: {
    flex: 1.2,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 70,
    fontWeight: '500',
    color: "white",
  },
  day: {
    width : SCREEN_WIDTH, //사용하는 디바이스 너비 만큼의 공간을 차지하게 됨
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    fontWeight: "600",
    marginTop: 50,
    fontSize: 80,
    color:"white"
  },
  description: {
    fontWeight: "500",
    marginTop: -10,
    fontSize: 30,
    color: "white",
  },
});
