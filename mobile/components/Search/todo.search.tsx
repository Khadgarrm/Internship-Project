import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {
  PagesSearch,
  TitleSearch,
  PublicSearch,
  CompletedSearch,
  Handler,
} from './search.service';

interface SearchProps {
  page: number;
  title: string;
  isPublic: boolean;
  isCompleted: boolean;
}

interface SearchParams {
  page: number;
  pageParams: (data) => void;
}
const SearchElement: React.FC = ({ page, pageParams }: SearchParams) => {
  const [search, setSearch] = useState<SearchProps>({
    page: page,
    title: ' ',
    isPublic: false,
    isCompleted: false,
  });

  const SearchHandler = () => {
    if (search.isReset) {
      pageParams(Handler([]));
    } else {
      const page = new PagesSearch('page', search.page);
      const title = new TitleSearch('title', search.title);
      const isPublic = new PublicSearch('isPublic', search.isPublic);
      const isCompleted = new CompletedSearch('isCompleted', search.isCompleted);
      pageParams(Handler([page, title, isPublic, isCompleted]));
    }
  };

  const titleItem = (value: string) => {
    setSearch({
      ...search,
      title: value,
    });
  };

  const publicItem = () => {
    setSearch({
      ...search,
      isPublic: true,
    });
  };

  const completedItem = () => {
    setSearch({
      ...search,
      isCompleted: true,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Type here..."
        value={search.title}
        onChangeText={titleItem}
        style={styles.input}
      />
      <View>
        <CheckBox
          style={styles.checkbox}
          value={search.isPublic}
          onValueChange={publicItem}
        />
        <Text>Public</Text>
      </View>
      <View>
        <CheckBox
          style={styles.checkbox}
          value={search.isCompleted}
          onValueChange={completedItem}
        />
        <Text>Completed</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={SearchHandler}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default SearchElement;
