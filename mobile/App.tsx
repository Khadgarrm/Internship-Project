import React from 'react';
import AddScreen from './components/Screens/AddScreen';
import CreateScreen from './components/Screens/CreateScreen';
import EditScreen from './components/Screens/EditScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
  import { ReactQueryDevtools } from 'react-query/devtools';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Todos">
          <Stack.Screen name="Todos" component={AddScreen}/>
          <Stack.Screen name="Create todo" component={CreateScreen}/>
          <Stack.Screen name="Edit todo" component={EditScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

