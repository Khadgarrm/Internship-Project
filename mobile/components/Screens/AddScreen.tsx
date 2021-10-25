import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useQuery } from 'react-query';
import ToDoContainer from '../ToDoContainer/ToDoContainer';
import toDoService from '../API/TODOAPI';

const AddScreen: React.FC = ({ navigation }: unknown) => {
  const ROUTES = 'todos';
  const { data } = useQuery(ROUTES, () => toDoService.getAllTodos());
  const handleCreateTodo = () => navigation.navigate('Create todo');
  return (
    <>
      <View style={styles.headerBtn}>
        <Button title='Create new Todo'
          onPress={handleCreateTodo} />
      </View>
      <View style={styles.todolist}>
        <ToDoContainer navigation={navigation} data={data} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  todolist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddScreen;
