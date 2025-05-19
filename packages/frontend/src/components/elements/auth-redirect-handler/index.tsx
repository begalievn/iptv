import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseRedirectResult } from '../../../infrastructure/firebase/auth';
import { useAuth } from '../../../infrastructure/contexts/auth-context';
import { REDIRECT_AFTER_LOGIN_KEY } from '../../../infrastructure/consts/local-storage-keys';

export function AuthRedirectHandler() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const performRedirectIfNeeded = async () => {
      try {
        const redirectPath = localStorage.getItem(REDIRECT_AFTER_LOGIN_KEY);
        const result = await getFirebaseRedirectResult();

        const isAuthenticated = result?.user || currentUser;

        if (isAuthenticated && redirectPath) {
          localStorage.removeItem(REDIRECT_AFTER_LOGIN_KEY);
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.error('Firebase redirect handling failed:', error);
      }
    };

    performRedirectIfNeeded();
  }, [navigate, currentUser]);

  return null;
}
