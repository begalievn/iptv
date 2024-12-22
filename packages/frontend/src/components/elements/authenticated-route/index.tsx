import React, { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../../infrastructure/consts/routes';
import { useAuth } from '../../../infrastructure/contexts/auth-context';

interface IAuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: FC<IAuthenticatedRouteProps> = (props) => {
  const { children } = props;
  const { userLoggedIn, loading } = useAuth();
  const { pathname, search } = useLocation();

  if (!userLoggedIn) {
    if (loading) return;
    return <Navigate to={`${routes.login}?redirect=${pathname}${search}`} />
  }

  return children;

}

export default AuthenticatedRoute;
