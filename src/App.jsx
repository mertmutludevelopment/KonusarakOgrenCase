// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store'; // store'u oluşturduğunuz dosyanın yolu
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import DetailScreen from './Screens/DetailScreen/DetailScreen';
import CharacterDetailScreen from './Screens/CharacterDetailScreen/CharacterDetailScreen';
import FavoriteCharactersScreen from './Screens/FavoriteCharactersScreen/FavoriteCharactersScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen name="CharacterDetails" component={CharacterDetailScreen} />
          <Stack.Screen name="FavoriteCharacters" component={FavoriteCharactersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

