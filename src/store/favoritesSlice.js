// src/store/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (state.favorites.length < 10) {
        state.favorites.push(action.payload);
        AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      } else {
        // Show notification about max favorite limit
        alert("Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.");
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(character => character.id !== action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    }
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export const loadFavorites = () => async dispatch => {
  const favorites = await AsyncStorage.getItem('favorites');
  if (favorites) {
    dispatch(setFavorites(JSON.parse(favorites)));
  }
};

export default favoritesSlice.reducer;
