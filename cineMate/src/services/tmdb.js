import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1,
        },
      });
      console.log("TMDB Response:", response.data); // <- Add this
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  };

  export const searchMovies = async (query) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          query,
          language: 'en-US',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  };

 
  
  