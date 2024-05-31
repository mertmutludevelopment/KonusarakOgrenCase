import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const FavoriteButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={onPress}
    >
      <Text style={styles.favoriteButtonText}>View Favorite Characters</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    backgroundColor: '#007bff',
    paddingVertical: moderateScale(16),
    borderRadius: scale(8),
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});

export default FavoriteButton;
