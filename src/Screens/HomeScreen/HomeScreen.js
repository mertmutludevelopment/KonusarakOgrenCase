import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet ,Text } from 'react-native';
import { fetchEpisodes } from '../../Services/api/episodeApi';
import Pagination from '../../Components/Pagination';
import EpisodeItem from './components/EpisodeItem';
import FavoriteButton from './components/FavoriteButton';
import SearchBar from './components/SearchBar';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FavoriteButton onPress={() => navigation.navigate('FavoriteCharacters')} />
      <FlatList
        data={filteredEpisodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EpisodeItem 
            episode={item} 
            onPress={() => navigation.navigate('Details', { episodeId: item.id })} 
          />
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
    padding: moderateScale(16),
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
