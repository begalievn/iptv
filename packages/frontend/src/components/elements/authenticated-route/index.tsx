import React, { FC } from 'react'
import { Navigate } from 'react-router-dom';
import { routes } from '../../../infrastructure/consts/routes';
import { useAuth } from '../../../infrastructure/contexts/auth-context';

interface IAuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: FC<IAuthenticatedRouteProps> = (props) => {
  const { children } = props;
  const { userLoggedIn, loading } = useAuth();

  if (!userLoggedIn) {
    if (loading) return;
    return <Navigate to={`${routes.login}`} />
  }

  return children;

}

export default AuthenticatedRoute;
