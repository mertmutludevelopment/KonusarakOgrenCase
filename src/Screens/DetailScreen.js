// DetailScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { fetchEpisodeById, fetchCharacterById } from '../Services/api';

const DetailScreen = ({ route }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const data = await fetchEpisodeById(episodeId);
        setEpisode(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching episode details:', error);
      }
    };

    fetchEpisodeData();
  }, [episodeId]);

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        // Assuming episode.characters is an array of character URLs
        const characterPromises = episode?.characters.map(url => fetchCharacterById(getCharacterIdFromUrl(url)));
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    if (episode?.characters) {
      fetchCharactersData();
    }
  }, [episode]);

  const getCharacterIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!episode) {
    return (
      <View style={styles.container}>
        <Text>Episode details not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{episode.name}</Text>
        <Text style={styles.text}>Episode: {episode.episode}</Text>
        <Text style={styles.text}>Air Date: {episode.air_date}</Text>

        <View style={styles.charactersContainer}>
          <Text style={styles.charactersTitle}>Characters:</Text>
          {characters.map((character, index) => (
            <View key={index} style={styles.characterItem}>
              <Text>{character.name}</Text>
              <Text>Status: {character.status}</Text>
              <Text>Species: {character.species}</Text>
              {/* Add additional character details as needed */}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  charactersContainer: {
    marginTop: 20,
    width: '100%',
  },
  charactersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  characterItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default DetailScreen;
