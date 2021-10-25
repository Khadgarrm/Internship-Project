import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import ToDoElement from '../ToDoElement/ToDoElement';
import toDoService from '../API/TODOAPI';
import Pagination from '../pagintaion/todo.pagination';
import { useQuery } from 'react-query';
import SearchElement from '../Search/todo.search';

interface todoProps {
  isTodoEdited: boolean,
  setIsTodoEdited: (value: boolean) => void,
  setTodo: (value: ITodo) => void
}

const ToDoContainer: React.FC = (
    { isTodoEdited, setIsTodoEdited, setTodo, navigation }: todoProps & unknown) => {
  const [todosArray, setTodosArray] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<string>('');

  const getTodoHandler = useCallback(
      async (string) => {
        try {
          const { data } = await toDoService.getAllTodos();
          setPage(data.page);
          return data;
        } catch {
          throw new Error();
        }
      },
      [params],
  );

  const handler = () => getTodoHandler(params);

  const { data, isLoading, isSuccess, isError } = useQuery(
      ['todos', params],
      handler,
  );

  if (isLoading) {
    <View>
      <Text>Loading...</Text>
    </View>;
  }

  if (isError) {
    <View>
      <Text>Error</Text>
    </View>;
  }

  useEffect(() => {
    if (!isSuccess) {
      setTodosArray(data);
    }
  }, [data, isSuccess]);

  const PaginationHandler = () => {
    return (
      <View>
        {data?.totalPages > 1 && (
          <Pagination counter={data?.totalPages} dispatch={setPage} />
        )}
      </View>
    );
  };

  const SearchHandler = () => {
    return (
      <View>
        <SearchElement page={page} pageParams={setParams} />
      </View>
    );
  };

  const itemRendered = ({ item }:any) => {
    return <ToDoElement item={item}
      navigation={navigation} isTodoEdited={isTodoEdited}
      setIsTodoEdited={setIsTodoEdited} setTodo={setTodo} />;
  };
  return (
    <>
      <FlatList
        data={data?.data}
        renderItem= {itemRendered}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={SearchHandler}
        ListFooterComponent={PaginationHandler}
      />
    </>
  );
};

export default ToDoContainer;
