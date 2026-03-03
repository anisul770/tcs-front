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

  const fetchUserProfile = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
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
    if (authTokens) fetchUserProfile();
  }, [authTokens]);


  const loginUser = async (userData) => {
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

  const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again"
  ) => {
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return { success: false, message: defaultMessage };
  }

  const updateProfile = async (data) => {
    setErrorMsg("");
    try {
      await authApiClient.patch('auth/users/me/', data);
      await fetchUserProfile(true);
      return { success: true, message: "Profile Data Updated.\n" }
    } catch (error) {
      return handleAPIError(error);
    }
  }


  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return { success: true, message: "Registration successful. Check your email to activate" }
    } catch (error) {
      return handleAPIError(error, "Registration Failed! Try Again");
    }
  };


  return { user, loginUser, errorMsg, loading, logout, updateProfile ,registerUser};

};

export default useAuth;