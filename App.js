import React from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  StatusBar, 
  Dimensions, 
  TextInput,
  Platform
 } from 'react-native';

const {height, width} = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>My Little Todo</Text>
      <View style={styles.card}> 
        <TextInput style={styles.input} placeholder={"New TODO"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5fcf6a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: -230
  },
  card: {
    backgroundColor: "white",
    flex: 2,
    width: width - 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor:"rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  }
});
