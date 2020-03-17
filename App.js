import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  StatusBar, 
  Dimensions, 
  TextInput,
  Platform,
  ScrollView,
  AsyncStorage
 } from 'react-native';
import { AppLoading } from 'expo';
import ToDo from "./ToDo";
import uuid from 'react-native-uuid';

const {height, width} = Dimensions.get("window");

export default function App() {
  const [newToDo, setNewToDo] = useState("");
  const [loadedToDos, setLoadedToDos] = useState(false);
  const [toDos, setToDos] = useState({});

  const onChangeNewToDo = text => {
    setNewToDo(text);
  }

  const loadToDos = async () => {
    try {
       const toDos = await AsyncStorage.getItem("mlToDos");
       const parsedToDos = JSON.parse(toDos);
       setLoadedToDos(true);
       setToDos(parsedToDos);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadToDos();
  }, [loadedToDos])

  const addToDo = () => {
    if (newToDo !== "") {
      const ID = uuid.v1();
      const newToDoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: newToDo,
          createAt: Date.now()
        }
      };
      setNewToDo("");
      setToDos(prevToDos => {
        saveToDos({...prevToDos, ...newToDoObject});
        return {...prevToDos, ...newToDoObject}
      });
    }
  }

  const deleteToDo = (id) => {
    setToDos((prevToDos) => {
      delete prevToDos[id];
      saveToDos(prevToDos);
      return {...prevToDos}
    });
  };

  const uncompleteToDo = (id) => {
    setToDos((prevToDos) => {
      prevToDos[id].isCompleted = false;
      saveToDos(prevToDos);
      return {...prevToDos}
    });
  };

  const completeToDo = (id) => {
    setToDos((prevToDos) => {
      prevToDos[id].isCompleted = true;
      saveToDos(prevToDos);
      return {...prevToDos}
    });
  };

  const updateToDo = (id, toDoText) => {
    setToDos((prevToDos) => {
      prevToDos[id].text = toDoText;
      saveToDos(prevToDos);
      return {...prevToDos}
    });
  };

  const saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("mlToDos", JSON.stringify(newToDos));
  };

  if (!loadedToDos) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>My Little Todo</Text>
      <View style={styles.card}> 
        <TextInput 
        style={styles.input} 
        placeholder={"New TODO"} 
        value={newToDo}
        onChangeText={onChangeNewToDo}
        placeholderTextColor={"#999"}
        returnKeyType={"done"}
        autoCorrect={false}
        onSubmitEditing={addToDo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          {Object.values(toDos)
            .reverse()
            .map(toDo => (
              <ToDo 
                key={toDo.id}  
                deleteToDo={deleteToDo}
                completeToDo={completeToDo}
                uncompleteToDo={uncompleteToDo}
                updateToDo={updateToDo}
                id={toDo.id}
                text={toDo.text}
                isCompleted={toDo.isCompleted}
              />)
            )}
        </ScrollView>
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
  },
  input: {
    padding: 15,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  },
  toDos: {
    alignItems: 'center'
  }
});
