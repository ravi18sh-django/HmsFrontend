import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);   
  if (!user) {
    return <Navigate to="/authentication/login/cover" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
