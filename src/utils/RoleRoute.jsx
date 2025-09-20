// src/components/RoleRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';
import Loader from '../utils/Loader';

const RoleRoute = ({ children, allow = [] }) => {
  const { user, userUrl, loading } = useAuth();
  if (loading) return <Loader />;

  if (!user) return <Navigate to='/login' replace />;

  if (!allow.includes(user.role))
    return <Navigate to={`/${userUrl}`} replace />;

  return children;
};

export default RoleRoute;
