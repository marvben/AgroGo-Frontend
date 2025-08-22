import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!user) return <Navigate to='/login' replace />;

  return children;
};

export default ProtectedRoute;
