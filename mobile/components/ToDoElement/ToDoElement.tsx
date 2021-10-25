import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useMutation, useQueryClient } from 'react-query';
import toDoService from '../API/TODOAPI';
import { styles } from '../styles/ToDoStyles';

const ToDoElement = ({ navigation, item } : unknown) => {
  const ROUTES = 'todos';
  const queryClient = useQueryClient();
  const mutation = useMutation(toDoService.removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(ROUTES);
    },
  });
  const handleRemove = (id: string) => mutation.mutate(id);
  const { _id, title, description, date, isPublic, isCompleted } = item;
  const handleEdit = () => navigation.navigate('Edit todo', { item });
  const handleRemoveClick = () => handleRemove(_id);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{Date.parse(date)}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesome name="edit" size={26} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveClick}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={26}
              color="red"
            />
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {isPublic ? 'Public |' : 'Private | '}
            </Text>
            <Text style={styles.statusText}>
              {isCompleted ? 'Completed' : 'In process'}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ToDoElement;
