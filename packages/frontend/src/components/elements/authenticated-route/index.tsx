import React, { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../../infrastructure/consts/routes';
import { useAuth } from '../../../infrastructure/contexts/auth-context';
import { REDIRECT_AFTER_LOGIN_KEY } from '../../../infrastructure/consts/local-storage-keys';

interface IAuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: FC<IAuthenticatedRouteProps> = (props) => {
  const { children } = props;
  const { userLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (!userLoggedIn) {
    if (loading) return;
    if (location.pathname === '/auth') {
      localStorage.setItem(REDIRECT_AFTER_LOGIN_KEY, location.pathname + location.search);
    }
    return <Navigate to={`${routes.login}`} />
  }

  return children;

}

export default AuthenticatedRoute;
