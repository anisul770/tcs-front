import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/categories");
      setCategories(res.data);
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Return fetchCategories as 'refresh'
  return { categories, loading, errorMsg, refresh: fetchCategories };
};

export default useCategories;