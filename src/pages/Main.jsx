import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { useAuthContext } from '../context/AuthContext';
import { toastWarnNotify } from '../utils/ToastMessage';
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const { currentUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  useEffect(() => {
    console.log('Running');
    const delayedSearch = setTimeout(() => {
      if (searchButtonClicked && searchTerm && currentUser) {
        console.log('searching');
        getMovies(SEARCH_API + searchTerm);
      } else if (!searchTerm && searchButtonClicked && currentUser) {
        console.log('not searching');
        getMovies(FEATURED_API);
        searchButtonClicked && setSearchButtonClicked(false);
      }
    }, 500);
    return () => clearTimeout(delayedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchButtonClicked]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!currentUser) {
            toastWarnNotify('Please login to search movies');
          }
        }}
        className='flex justify-center p-2 mt-2 gap-2'
      >
        <input
          type='search'
          className='h-14 rounded-md p-2 w-96'
          placeholder='Search a movie...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          class='search-button'
          onClick={() => setSearchButtonClicked(true)}
        >
          Search
        </button>
      </form>
      <div
        className={
          'flex m-auto justify-center items-center flex-wrap container'
        }
      >
        <div
          className='flex flex-wrap justify-center items-center 
        container 
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-6
        xl:grid-cols-6
        2xl:grid-cols-7
        gap-3  
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
          {!loading &&
            movies
              .sort((a, b) => b.vote_average - a.vote_average)
              .map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      </div>
    </>
  );
};

export default Main;
