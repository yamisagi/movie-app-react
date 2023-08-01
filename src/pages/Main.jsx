import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { useAuthContext } from '../context/AuthContext';
import { toastWarnNotify } from '../utils/ToastMessage';
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const { currentUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser && searchTerm) {
      getMovies(SEARCH_API + searchTerm);
    } else if (!currentUser) {
      toastWarnNotify('Please log in to search movies');
    } else {
      toastWarnNotify('please enter a text');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='flex justify-center p-2 mt-2'>
        <input
          type='search'
          className='w-80 h-8 rounded-md p-1 m-2'
          placeholder='Search a movie...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='btn-danger-bordered'>Search</button>
      </form>
      <div className={'flex justify-center flex-wrap'}>
        <div
          className='movie-container
          xl:grid xl:grid-cols-5 xl:gap-5
          lg:grid lg:grid-cols-4 lg:gap-4
          md:grid md:grid-cols-3 md:gap-3
          sm:grid sm:grid-cols-2 sm:gap-2
          xs:grid xs:grid-cols-1 xs:gap-1
        '
        >
          {loading && (
            <div className='flex justify-center items-center'>
              <div
                className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52'
                role='status'
              >
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
