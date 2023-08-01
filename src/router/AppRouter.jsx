import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from '../pages/Main';
import Register from '../pages/Register';
import Login from '../pages/Login';
import MovieDetails from '../pages/MovieDetails';
import PrivateRouter from './PrivateRouter';

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRouter />}>
          <Route path='/details/:id' element={<MovieDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
