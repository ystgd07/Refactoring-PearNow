import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore/authStore';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, initializing } = useAuthStore();
  
  if (initializing) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;