import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../utils/errorMessages';
import { toastErrorNotify, toastSuccessNotify } from '../utils/ToastMessage';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    console.log('create user');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName,
      });

      console.log(user);
      console.log(user.displayName);
      navigate('/login');
      toastSuccessNotify('User created successfully');
    } catch (error) {
      console.log(error.code);
      toastErrorNotify(errorMessages[error.code]);
    }
  };

  const signIn = async (email, password) => {
    console.log('sign in');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      toastSuccessNotify('Signed in successfully');
      navigate('/');
    } catch (error) {
      console.log(error.code);
      toastErrorNotify(errorMessages[error.code]);
    }
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify('Logged out successfully!');
    navigate('/login');
  };

  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        console.log(user);
      } else {
        // User is signed out
        setCurrentUser(false);
        console.log('logged out');
      }
    });
  };

  const signUpProvider = async () => {
    const provider = new GoogleAuthProvider();

    try {
      signInWithPopup(auth, provider);
      toastSuccessNotify('Signed in successfully');
      navigate('/');
    } catch (error) {
      console.log(error.code);
      toastErrorNotify(errorMessages[error.code]);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{ createUser, signIn, logOut, currentUser, signUpProvider }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
