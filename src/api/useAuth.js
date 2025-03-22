import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from '../redux/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout()); // Dispatch logout action
    localStorage.removeItem("HMSMern"); // Clear token
    navigate("/authentication/login/cover"); // Redirect to login
  };

  return { handleLogout };
};

export default useAuth;
