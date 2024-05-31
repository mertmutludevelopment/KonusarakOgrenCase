import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { fetchEpisodes } from '../Services/api';
import Pagination from '../Components/Pagination';

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const data = await fetchEpisodes(currentPage);
        setEpisodes(data.results);
        setFilteredEpisodes(data.results);
        setTotalPages(data.info.pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setLoading(false);
      }
    };

    loadEpisodes();
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes.filter((episode) =>
        episode.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  }, [searchQuery, episodes]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setLoading(true);
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by episode name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('FavoriteCharacters')}
      >
        <Text style={styles.favoriteButtonText}>View Favorite Characters</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredEpisodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.episodeContainer}>
            <TouchableOpacity
              style={styles.episodeContent}
              onPress={() => navigation.navigate('Details', { episodeId: item.id })}
            >
              <Text style={styles.episodeTitle}>{item.name}</Text>
              <Text style={styles.episodeText}>Episode: {item.episode}</Text>
              <Text style={styles.episodeText}>Air Date: {item.air_date}</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  episodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 8,
  },
  episodeContent: {
    flex: 1,
    marginRight: 8,
  },
  episodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeText: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default HomeScreen;
