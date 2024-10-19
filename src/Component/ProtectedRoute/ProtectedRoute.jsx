// import { useAuth } from '../context/AuthContext'

import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     // user is not authenticated
//     return <Navigate to="/login" />;
//   }
  return <Outlet />;
};

export default ProtectedRoute;