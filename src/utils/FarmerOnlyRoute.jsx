import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';

const FarmerOnlyRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role === 'farmer') return children;
  return children;
  // return <Navigate to={'/not-authorized'} replace />;
};

export default FarmerOnlyRoute;
