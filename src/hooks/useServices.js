import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';

const useServices = ({ currentPage, selectedCategory, ordering, priceRange, searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const url = `/services/?page=${currentPage}&category_id=${selectedCategory}&ordering=${ordering}&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&search=${searchQuery}`
      try {
        const res = await apiClient.get(url);
        const data = await res.data;

        setServices(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setErrorMsg("");
      } catch (error) {
        setErrorMsg(error.response);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [currentPage, selectedCategory, ordering, priceRange, searchQuery]);

  return { loading, services, errorMsg, totalPages };
};

export default useServices;