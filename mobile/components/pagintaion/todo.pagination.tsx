import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, FlatList, StyleSheet,
  TouchableOpacity, ListRenderItem } from 'react-native';
interface TodoPages {
    counter: number;
    dispatch: Dispatch<SetStateAction<number>>;
}
const Pagination = (pages: TodoPages) => {
  const pagesArray = [];
  for (let i = 1; i <= pages.counter; i++) {
    pagesArray.push(i);
  }
  const Handler = (item:any) => () => {
    pages.dispatch(item);
  };
  const Render: ListRenderItem<any> = ({ item }) => {
    return (
      <View style={ styles.button }>
        <TouchableOpacity
          onPress={ Handler(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={pagesArray}
      renderItem={Render}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: 50,
    height: 50,
  },
});

export default Pagination;
