import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { Formik } from 'formik';
import toDoApi, { ITodo } from '../API/TODOAPI';
import { useQueryClient, useMutation } from 'react-query';
import styles from '../styles/FormStyles';
import { theme } from '../styles/theme';

interface Values {
    title: string;
    description: string;
}


const EditScreen: React.FC = ({ navigation, route } : any) => {
  const {
    params: { item },
  } = route;

  const ROUTES = 'todos';
  const [isPublic, setPublic] = useState(item.isPublic);
  const [isCompleted, setCompleted] = useState(item.isCompleted);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(toDoApi.updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(ROUTES);
    },
  });
  const onSumbit = (values: Values) => {
    if (values?.title.trim() === '' || values?.description.trim() === '') {
      return setError(true);
    }
    setError(false);
    const todo: ITodo = {
      ...values, isPublic, isCompleted,
      _id: '',
    };
    mutation.mutate(todo);
    navigation.navigate('Todos');
  };
  const onComplet = () => setCompleted(!isCompleted);
  const onPrivate = () => setPublic(!isPublic);
  return (
    <Formik
      initialValues={{
        title: item.title,
        description: item.description,
      }}
      onSubmit={onSumbit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Edit todo</Text>
          <TextInput
            placeholder="title"
            style={styles.input}
            onChangeText={handleChange('title')}
            value={values.title}
          />
          <TextInput
            placeholder="description"
            style={styles.input}
            onChangeText={handleChange('description')}
            value={values.description}
            multiline
            numberOfLines={4}
          />
          <View style={styles.checkboxContainer}>
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
          </View>
          <Button
            color={`${error ? theme.error : theme.ok}`}
            onPress={(e) => handleSubmit(e)}
            title={error ? 'Fill all fileds' : 'Edit'}
          />
        </View>
      )}
    </Formik>
  );
};


export default EditScreen;
