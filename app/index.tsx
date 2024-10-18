import { View, Text, StyleSheet, FlatList, Modal, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [index, setIndex] = useState(0);

  // Add Todo
  const addTodo = () => {
    if (input.trim()) {
      setTodo([...todo, input]);
      setInput('');
    }
  };

  // Delete Todo
  const deleteTodo = (index: number) => {
    const updatedTodos = [...todo];
    updatedTodos.splice(index, 1);
    setTodo(updatedTodos);
  };

  // Edit Todo
  const editTodo = () => {
    if (updateInput.trim()) {
      const updatedTodos = [...todo];
      updatedTodos.splice(index, 1, updateInput);
      setTodo(updatedTodos);
      setUpdateInput('');
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        margin: 10,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'italic',
        }}
      >
        Todo App!
      </Text>

      <TextInput
  style={styles.input}
  onChangeText={setInput}
  value={input}
  placeholder="Enter Todo"
  placeholderTextColor="black"
/>

      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => deleteTodo(index)}
                  activeOpacity={0.5}
                >
                  <Text style={{
                    backgroundColor: "red",
                    padding: 5,
                  }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => {
                    setIndex(index);
                    setUpdateInput(todo[index]);
                    setModalVisible(true);
                  }}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={{ ...styles.title, color: 'black', margin: 20 }}>No Todo Found...</Text>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Todo!</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={setUpdateInput}
                value={updateInput}
              />
              <Pressable
                style={[styles.Modalbutton, styles.buttonClose]}
                onPress={() => editTodo()}
              >
                <Text style={styles.textStyle}>Update Todo</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginHorizontal: 120,
  },
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
  },
  startBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Modalbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalInput: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    marginVertical: 20,
    borderWidth: 3,
    padding: 10,
    width: 130,
    textAlign: "center"
  },
});

export default Home;
