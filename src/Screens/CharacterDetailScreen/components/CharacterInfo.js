import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const CharacterInfo = ({ character }) => (
  <View style={styles.container}>
    <Image source={{ uri: character.image }} style={styles.image} />
    <Text style={styles.name}>{character.name}</Text>
    <Text style={styles.detail}>Status: {character.status}</Text>
    <Text style={styles.detail}>Species: {character.species}</Text>
    <Text style={styles.detail}>Gender: {character.gender}</Text>
    <Text style={styles.detail}>Origin: {character.origin.name}</Text>
    <Text style={styles.detail}>Location: {character.location.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
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
});

export default CharacterInfo;
