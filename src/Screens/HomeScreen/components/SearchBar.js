import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search by episode name"
      value={searchQuery}
      onChangeText={(text) => setSearchQuery(text)}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: verticalScale(38),
    borderColor: '#ccc',
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(16),
  },
});

export default SearchBar;
