// GoalItem 하나하나를 출력하기 위한 코드를 모아놓음
import { StyleSheet, Text, View } from 'react-native';

function GoalItem(props) {
    return (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{props.text}</Text>
        </View>
    )
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItem : {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
      },
      goalText: {
        color:'white'
      }
})