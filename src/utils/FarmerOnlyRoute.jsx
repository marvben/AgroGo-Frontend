import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';

const FarmerOnlyRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={'/login'} replace />;

  if (user?.role !== 'farmer')
    return <Navigate to={'/not-authorized'} replace />;

  return children;
};

export default FarmerOnlyRoute;
