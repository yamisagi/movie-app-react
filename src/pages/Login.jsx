import React, { useState } from 'react';
import GoogleIcon from '../assets/icons/GoogleIcon';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { toastErrorNotify } from '../utils/ToastMessage';
const Login = () => {
  const { signIn, signUpProvider, forgotPassword } = useAuthContext();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(user.email, user.password);
  };

  return (
    <div className='overflow-hidden flex-1 h-screen justify-center items-center bg-[#23242a]'>
      <div
        className={`mt-[3vh] mx-auto overflow-hidden relative w-[380px] h-[620px] rounded-[8px] bg-[#1c1c1c] before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%] custom-linear-gradient`}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='absolute inset-[2px] rounded-[8px] bg-gray-100 dark:bg-[#28292d] z-[10] flex flex-col py-[50px] px-[40px]'
        >
          <h2 className='text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3'>
            Sign In
          </h2>
          <div className='relative z-0 w-full my-6 group'>
            <input
              className='peer'
              name='floating_email'
              type='email'
              placeholder=' '
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor='floating_email'>Email</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              className='peer'
              name='floating_password'
              type='password'
              placeholder=' '
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label htmlFor='floating_password'>Password</label>
          </div>
          <div className='flex justify-between items-center mb-6'>
            {/* TODO: Add Forgot password functionality */}
            <span className='text-red-main'>Forgot password?</span>
            <Link
              to='/register'
              className='text-red-main'
              onClick={() => {
                if (user.email) {
                  forgotPassword(user.email);
                }
              }}
            >
              Sign Up
            </Link>
          </div>
          <button type='submit' className='btn-danger'>
            Login
          </button>
          <button
            type='button'
            className='btn-danger flex justify-between items-center'
            onClick={() => signUpProvider()}
          >
            Continue with Google
            <GoogleIcon color='currentColor' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
