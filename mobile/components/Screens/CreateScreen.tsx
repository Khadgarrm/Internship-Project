import React, { useState } from 'react';
import { View, Text, Button, TextInput,
  TouchableOpacity, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import toDoService, { ITodo } from '../API/TODOAPI';
import { useQueryClient, useMutation } from 'react-query';
import styles from '../styles/FormStyles';
import { theme } from '../styles/theme';

interface IValues {
    title: string;
    description: string;
};


const CreateScreen: React.FC = (props) => {
  const [isPublic, setPublic] = useState(false);
  const [isCompleted, setCompleted] = useState(true);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  const ROUTES = 'todos';
  const mutation = useMutation(toDoService.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(ROUTES);
    },
  });

  const onSubmit = (values: IValues) => {
    if (values?.title.trim() === '' || values?.description.trim() === '') {
      return setError(true);
    }
    setError(false);
    const date = new Date().getFullYear();
    const todo: ITodo = {
      ...values, isPublic, isCompleted, date,
      _id: '' };
    mutation.mutate(todo);
    props.navigation.navigate('Todos');
  };
  const onComplet = () => setCompleted(!isCompleted);
  const onPrivate = () => setPublic(!isPublic);
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        date: '',
        isPublic: false,
        isCompleted: false,
      }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values } : unknown) => (
        <View style={styles.container}>
          <Text style={styles.title}>Create new todo</Text>
          <TextInput
            placeholder="Write your title here..."
            style={styles.input}
            onChangeText={handleChange('title')}
            value={values.title}
          />
          <TextInput
            placeholder="Write you description here..."
            style={styles.input}
            onChangeText={handleChange('description')}
            value={values.description}
            multiline
            numberOfLines={5}
          />
          <TextInput
            placeholder="Wite your date here..."
            style={styles.input}
            onChangeText={handleChange('date')}
            value={values.date}
            multiline
            numberOfLines={1}
          />
          <TouchableOpacity style={styles.checkboxContainer}>
            <CheckBox
              title="Completed"
              checked={isCompleted}
              onPress={onComplet}
            />
            <CheckBox
              title="Public"
              checked={isPublic}
              onPress={onPrivate}
            />
          </TouchableOpacity>
          <TouchableHighlight>
            <Button
              color={`${error ? theme.error : theme.ok}`}
              onPress={handleSubmit}
              title={error ? 'Fill all fileds' : 'Sumbit'}
            />
          </TouchableHighlight>
        </View>
      )}
    </Formik>
  );
};

export default CreateScreen;
