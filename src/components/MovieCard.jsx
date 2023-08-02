import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const defaultImage =
  'https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80';
const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
  let navigate = useNavigate();

  const { currentUser } = useAuthContext();

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 6) {
      return 'orange';
    } else {
      return 'red';
    }
  };
  return (
    <div className='movie' id='container'>
      <img
        loading='lazy'
        src={poster_path ? IMG_API + poster_path : defaultImage}
        onClick={() => navigate('/details/' + id)}
        alt='movie-card'
      />
      <div className='movie-info flex justify-between items-center h-16 w-100 p-2 text-center text-white'>
        <h5 className='w-40 text-center my-5'>{title}</h5>
        {currentUser ? (
          <span
            className={`tag ${getVoteClass(vote_average)} my-auto text-center`}
          >
            {vote_average.toFixed(1)}
          </span>
        ) : (
          <span
            className={`tag ${getVoteClass(vote_average)} my-auto text-center`}
            style={{ filter: 'blur(5px)' }}
          >
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className='movie-over'>
        <h2>Overview</h2>
        {currentUser ? (
          <p>{overview}</p>
        ) : (
          <h2>
            Please{' '}
            <Link className='text-red-main' to={'/login'}>
              Login
            </Link>{' '}
            to see the overview
          </h2>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
