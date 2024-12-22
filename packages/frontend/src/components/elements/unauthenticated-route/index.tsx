import { cloneElement, FC, ReactElement } from 'react'
import { useAuth } from '../../../infrastructure/contexts/auth-context';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../../infrastructure/consts/routes';

interface IUnauthenticatedRouteProps {
  children: ReactElement;
}

const UnauthenticatedRoute: FC<IUnauthenticatedRouteProps> = (props) => {
  const { children } = props;
  const { userLoggedIn } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const redirectValue = searchParams.get('redirect');
  const redirectRoute = redirectValue ? `${redirectValue}` : routes.home;

  if (userLoggedIn) {
    return <Navigate to={redirectRoute} />;
  }

  return cloneElement(children, props);
}

export default UnauthenticatedRoute;
