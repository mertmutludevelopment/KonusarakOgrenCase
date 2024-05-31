import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, loadFavorites } from '../store/favoritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const renderItem = ({ item }) => (
    <View style={styles.characterItem}>
      <Image source={{ uri: item.image }} style={styles.characterImage} />
      <Text style={styles.characterName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
        <Icon name="trash-bin-outline" size={24} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Characters</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  characterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 8,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  characterName: {
    fontSize: 18,
    flex: 1,
  },
});

export default FavoriteCharactersScreen;
