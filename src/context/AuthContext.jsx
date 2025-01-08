import React, { createContext, useReducer, useEffect } from 'react';
import { auth } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const initialState = {
  user: null,
  loading: false,
  error: null,
  checked: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER_START':
    case 'LOGIN_USER_START':
    case 'LOGOUT_USER_START':
      return { ...state, loading: true, error: null };

    case 'REGISTER_USER_SUCCESS':
    case 'LOGIN_USER_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null };

    case 'LOGOUT_USER_SUCCESS':
      return { ...state, user: null, loading: false, error: null };

    case 'REGISTER_USER_FAIL':
    case 'LOGIN_USER_FAIL':
    case 'LOGOUT_USER_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CHECK_AUTH_STATE':
      return { ...state, checked: true };

    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        dispatch({ type: 'LOGIN_USER_SUCCESS', payload: userData });
      } else {
        dispatch({ type: 'LOGOUT_USER_SUCCESS' });
      }
      dispatch({ type: 'CHECK_AUTH_STATE' });
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async (email, password) => {
    dispatch({ type: 'REGISTER_USER_START' });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      dispatch({ type: 'REGISTER_USER_SUCCESS', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'REGISTER_USER_FAIL', payload: error.code });
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    dispatch({ type: 'LOGIN_USER_START' });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'LOGIN_USER_FAIL', payload: error.code });
      throw error;
    }
  };

  const logoutUser = async () => {
    dispatch({ type: 'LOGOUT_USER_START' });
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT_USER_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGOUT_USER_FAIL', payload: error.code });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      authState: state, 
      registerUser, 
      loginUser, 
      logoutUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};