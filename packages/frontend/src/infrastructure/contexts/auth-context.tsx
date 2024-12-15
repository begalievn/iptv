import React, { FC, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface IAutProviderProps {
  children: React.ReactNode;
}

interface IAuthContext {
  currentUser: User | null
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
});

const AuthProvider: FC<IAutProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState < User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  async function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      const token = await user.getIdToken();
      console.log('token', token);
      localStorage.setItem('token', token);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
};


export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
