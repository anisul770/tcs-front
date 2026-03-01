import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  }
  const [loading, setLoading] = useState(!!getToken());

  const [authTokens, setAuthTokens] = useState(getToken());

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get(`/auth/users/me/`);
      setUser(res.data);
    } catch (error) {
      console.log(error.response);
      setAuthTokens(null);
      localStorage.removeItem("authTokens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(authTokens) fetchUserProfile();
  }, [authTokens]);
  

  const loginUser = async(userData) => {
    setLoading(true);
    try {
      const res = await apiClient.post(`/auth/jwt/create/`, userData);
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      setAuthTokens(res.data);
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      setErrorMsg(error.response);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    window.location.href = '/login';
  };

  return { user, loginUser, errorMsg, loading, logout };

};

export default useAuth;