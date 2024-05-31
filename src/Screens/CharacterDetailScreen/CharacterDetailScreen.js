import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterById } from '../../Services/api/characterApi';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const CharacterDetailScreen = ({ route }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setLoading(false);
      }
    };

    loadCharacter();
  }, [characterId]);

  const isFavorite = favorites.some(fav => fav.id === characterId);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(characterId));
    } else {
      dispatch(addFavorite(character));
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>Character not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.detail}>Status: {character.status}</Text>
      <Text style={styles.detail}>Species: {character.species}</Text>
      <Text style={styles.detail}>Gender: {character.gender}</Text>
      <Text style={styles.detail}>Origin: {character.origin.name}</Text>
      <Text style={styles.detail}>Location: {character.location.name}</Text>
      <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
        <Icon
          name={isFavorite ? "heart" : "heart-outline"}
          size={30}
          color="#ff0000"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: scale(10),
  },
  name: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginVertical: moderateScale(10),
    textAlign: 'center',
  },
  detail: {
    fontSize: scale(18),
    marginVertical: moderateScale(5),
    textAlign: 'center',
  },
  favoriteButton: {
    marginTop: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    backgroundColor: '#fff',
    borderRadius: scale(50),
    elevation: 5,
  },
  icon: {
    padding: moderateScale(5),
  },
});

export default CharacterDetailScreen;
