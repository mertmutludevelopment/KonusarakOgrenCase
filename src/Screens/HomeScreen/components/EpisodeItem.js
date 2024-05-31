import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const EpisodeItem = ({ episode, onPress }) => {
  return (
    <View style={styles.episodeContainer}>
      <TouchableOpacity
        style={styles.episodeContent}
        onPress={onPress}
      >
        <Text style={styles.episodeTitle}>{episode.name}</Text>
        <Text style={styles.episodeText}>Episode: {episode.episode}</Text>
        <Text style={styles.episodeText}>Air Date: {episode.air_date}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  episodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: scale(8),
    marginVertical: moderateScale(8),
  },
  episodeContent: {
    flex: 1,
    marginRight: moderateScale(8),
  },
  episodeTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  episodeText: {
    fontSize: scale(16),
    marginTop: moderateScale(4),
  },
});

export default EpisodeItem;
