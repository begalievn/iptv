import React, { FC, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { isSignInWithEmailLink, onAuthStateChanged, User } from "firebase/auth";
import { getEmailFromStorage, signInWithEmail } from "../firebase/auth";
import { TOKEY_KEY } from "../consts/local-storage-keys";
import { AuthRedirectHandler } from "../../components/elements/auth-redirect-handler";

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
      localStorage.setItem(TOKEY_KEY, token);
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

  useEffect(() => {
    const href = window.location.href;
    if (href && isSignInWithEmailLink(auth, href)) {
      const email = getEmailFromStorage();
      if (email) {
        (
          async () => {
            await signInWithEmail(email, href);
          }
        )();
      }
    }
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      <AuthRedirectHandler />
      { children }
    </AuthContext.Provider>
  )
};


export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
