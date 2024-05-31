import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { fetchEpisodeById, fetchCharacterById } from '../Services/api';
import Pagination from '../Components/Pagination';

const DetailScreen = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadEpisodeData();
  }, [episodeId]);

  useEffect(() => {
    if (episode) {
      loadCharacters(currentPage);
    }
  }, [episode, currentPage]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [searchQuery, characters]);

  const loadEpisodeData = async () => {
    try {
      const data = await fetchEpisodeById(episodeId);
      setEpisode(data);
      setTotalPages(Math.ceil(data.characters.length / 10));
    } catch (error) {
      console.error('Error fetching episode details:', error);
    }
  };

  const loadCharacters = async (page) => {
    setLoading(true);
    try {
      const start = (page - 1) * 10;
      const end = start + 10;
      const characterUrls = episode.characters.slice(start, end);
      const characterPromises = characterUrls.map(url => fetchCharacterById(getCharacterIdFromUrl(url)));
      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
      setFilteredCharacters(characterData);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setLoading(true);
      setCurrentPage(page);
    }
  };

  if (!episode) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.text}>Episode: {episode.episode}</Text>
      <Text style={styles.text}>Air Date: {episode.air_date}</Text>
      <Text style={styles.subtitle}>Characters:</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by character name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredCharacters}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  characterItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterText: {
    fontSize: 16,
  },
});

export default DetailScreen;
