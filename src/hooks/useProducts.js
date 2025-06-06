import axios from "axios";
import { useEffect, useState } from "react";

const useProducts = (categoryId, searchValue) => {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorBackend, setErrorBackend] = useState(false);

  const getProducts = async () => {
    const category = categoryId > 0 ? `categoryId=${categoryId}` : "";

    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_API_URL}/api/product?${category}`);
      setItems(response.data.rows);
    } catch (error) {
      setErrorBackend(true);
      console.error("Ошибка при загрузке блюд");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/category`);
      setCategories(response.data);
    } catch (error) {
      setErrorBackend(true);
      console.error("Ошибка при загрузке категорий");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [categoryId, searchValue]);

  return { items, categories, loading, errorBackend };
};

export default useProducts;
