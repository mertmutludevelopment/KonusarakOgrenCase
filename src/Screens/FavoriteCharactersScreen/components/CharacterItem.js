import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const CharacterItem = ({ character, onRemove }) => (
  <View style={styles.characterItem}>
    <Image source={{ uri: character.image }} style={styles.characterImage} />
    <Text style={styles.characterName}>{character.name}</Text>
    <TouchableOpacity onPress={() => onRemove(character)}>
      <Icon name="trash-bin-outline" size={24} color="#ff0000" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  characterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: scale(8),
    marginVertical: moderateScale(8),
  },
  characterImage: {
    width: scale(50),
    height: verticalScale(50),
    borderRadius: scale(25),
    marginRight: moderateScale(16),
  },
  characterName: {
    fontSize: scale(18),
    flex: 1,
  },
});

export default CharacterItem;
