// src/App.jsx
import React, { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from './services/tmdb';
import MovieCard from './components/MovieCard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const fetchGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=171167766c8f37aa8173b5c5b9a9aa0c`
    );
    const data = await res.json();
    return data.genres;
  };

  useEffect(() => {
    getPopularMovies().then(setMovies);

    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenre) return;
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=171167766c8f37aa8173b5c5b9a9aa0c&with_genres=${selectedGenre}`
      );
      const data = await res.json();
      setMovies(data.results);
    };
    fetchMoviesByGenre();
  }, [selectedGenre]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      getPopularMovies().then(setMovies);
    } else {
      const results = await searchMovies(query);
      setMovies(results);
    }
  };

  const suggestRandomMovie = async () => {
    let pool = [];

    if (query.trim()) {
      pool = await searchMovies(query);
    } else {
      pool = await getPopularMovies();
    }

    if (pool.length > 0) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      setMovies([pool[randomIndex]]);
    } else {
      alert('No movies found to suggest.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-12 font-poppins">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-12">
        🎥 CineMate
      </h1>

      {/* Search & Suggestion Controls */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-10">
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-lg w-full gap-4"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="flex-1 px-6 py-3 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600 transition-shadow shadow-md"
          >
            🔍 Search
          </button>
        </form>

        <button
          onClick={suggestRandomMovie}
          className="px-8 py-3 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition-shadow shadow-md"
        >
          🎲 Suggest Me a Movie
        </button>
      </div>

      {/* Genre Filter */}
      <div className="flex justify-center mb-12">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-6 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-lg shadow-sm"
        >
          <option value="">🎬 Filter by Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;