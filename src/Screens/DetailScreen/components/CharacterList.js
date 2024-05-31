import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const CharacterList = ({ characters, loading, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.characterItem}
      onPress={() => navigation.navigate('CharacterDetails', { characterId: item.id })}
    >
      <Text style={styles.characterName}>{item.name}</Text>
      <Text style={styles.characterText}>Status: {item.status}</Text>
      <Text style={styles.characterText}>Species: {item.species}</Text>
      <Text style={styles.characterText}>Gender: {item.gender}</Text>
      <Text style={styles.characterText}>Origin: {item.origin.name}</Text>
      <Text style={styles.characterText}>Location: {item.location.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={characters}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  characterItem: {
    marginBottom: moderateScale(16),
    padding: moderateScale(10),
    backgroundColor: '#f0f0f0',
    borderRadius: scale(5),
  },
  characterName: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  characterText: {
    fontSize: scale(16),
  },
});

export default CharacterList;
