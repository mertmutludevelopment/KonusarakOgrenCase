import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet,Text } from 'react-native';
import { fetchEpisodeById } from '../../Services/api/episodeApi';
import { fetchCharacterById } from '../../Services/api/characterApi';
import Pagination from '../../Components/Pagination';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.text}>Episode: {episode.episode}</Text>
      <Text style={styles.text}>Air Date: {episode.air_date}</Text>
      <Text style={styles.subtitle}>Characters:</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CharacterList 
        characters={filteredCharacters} 
        loading={loading}
        navigation={navigation}
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
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(16),
  },
  text: {
    fontSize: scale(18),
    marginBottom: moderateScale(8),
  },
  subtitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginTop: moderateScale(16),
    marginBottom: moderateScale(8),
  },
});

export default DetailScreen;
