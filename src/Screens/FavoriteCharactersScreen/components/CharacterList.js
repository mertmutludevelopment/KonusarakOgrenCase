import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CharacterItem from './CharacterItem';

const CharacterList = ({ characters, onRemove }) => (
  <FlatList
    data={characters}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <CharacterItem character={item} onRemove={onRemove} />
    )}
  />
);

export default CharacterList;
