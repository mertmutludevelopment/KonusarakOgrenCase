import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const FavoriteButton = ({ isFavorite, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={styles.favoriteButton}>
    <Icon
      name={isFavorite ? "heart" : "heart-outline"}
      size={30}
      color="#ff0000"
      style={styles.icon}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default FavoriteButton;
