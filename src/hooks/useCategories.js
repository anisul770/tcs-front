import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        await apiClient.get("/categories").then((res) => setCategories(res.data));
      } catch (error) {
        setErrorMsg(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, [])
  return { categories, loading ,errorMsg};
};

export default useCategories;