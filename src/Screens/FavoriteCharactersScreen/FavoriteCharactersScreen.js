import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, loadFavorites } from '../../store/favoritesSlice';
import CharacterList from './components/CharacterList';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const FavoriteCharactersScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = (character) => {
    Alert.alert(
      'Remove Favorite',
      `Are you sure you want to remove ${character.name} from favorites?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(removeFavorite(character.id)),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Characters</Text>
      <CharacterList characters={favorites} onRemove={handleRemoveFavorite} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(16),
  },
});

export default FavoriteCharactersScreen;
