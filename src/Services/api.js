// src/Services/api.js
const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = async (page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/episode?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

export const fetchEpisodeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/episode/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching episode by ID:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    throw error;
  }
};
