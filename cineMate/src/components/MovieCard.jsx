// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-80 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
        {movie.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {movie.overview}
      </p>
      <div className="flex justify-between items-center">
        <span className="inline-block bg-yellow-400 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
          ⭐ {movie.vote_average}
        </span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Details
        </button>
      </div>
    </div>
  </div>
);

export default MovieCard;
