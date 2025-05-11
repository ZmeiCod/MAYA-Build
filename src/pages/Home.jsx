import React from "react";
import axios from "axios";
import { Context } from "../App";
import Header from "../components/Header";
import Footer from "../components/Footer";
import arrow from "../assets/ui/arrow.svg";
import Cookies from "../components/Cookies";
import Carousel from "../components/Carousel";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import { setCategoryId } from "../redux/filter/slice";
import { useSelector, useDispatch } from "react-redux";


export default function Home() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const [showCookies, setShowCookies] = React.useState(false);
  const { searchValue } = React.useContext(Context);
  const [items, setItems] = React.useState([]);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [errorBackend, setErrorBackend] = React.useState(false)

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    const cookiesConsent = document.cookie.split('; ').find(row => row.startsWith('cookiesConsent='));
    if (!cookiesConsent) {
      setShowCookies(true);
    }
  }, []);

  const getProducts = async () => {
    const category = categoryId > 0 ? `categoryId=${categoryId}` : "";

    try {
      setLoading(true);
      const response = await axios.get(`${REACT_APP_API_URL}/api/product?${category}`);
      const products = response.data.rows;
      setItems(products);
    } catch (error) {
      setErrorBackend(true);
      console.error("Ошибка при загрузке блюд");
      setItems([]);
    } finally {
        setLoading(false); // Завершаем загрузку независимо от результата
      }
  };

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${REACT_APP_API_URL}/api/category`);
        setCategories(response.data);
      } catch (error) {
        setErrorBackend(true);
        console.error("Ошибка при загрузке категорий");
      } finally {
        setLoading(false); // Завершаем загрузку независимо от результата
      }
    };

    getCategories();
  }, []);

  const getCategoryIdByName = (name) => {
    const category = categories.find((category) => category.name === name);
    return category ? category.id : null;
  };

  React.useEffect(() => {
    getProducts();
  }, [categoryId, searchValue]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hasProducts = items.length > 0;

  const productItems = categories.map((category) => {
    const categoryItems = items.filter(
      (item) => item.categoryId === category.id
    );

    if (categoryItems.length > 0) {
      return (
        <div key={category.id}>
          <h2 className="content__title">{category.name}</h2>
          <div className="content__items">
            {categoryItems.map((item) => (
              <PizzaBlock
                key={item.id}
                id={item.id}
                article={item.article}
                article40={item.article40}
                image={REACT_APP_API_URL + "/api/static/" + item.image}
                title={item.name}
                price={item.price}
                price40={item.price40}
                description={item.description}
                weight={item.weight}
                weight40={item.weight40}
                categoryId={item.categoryId}
                isPizza={getCategoryIdByName("Пицца") === item.categoryId}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="app">
      <Header/>
      <Carousel/>
      {showCookies && <Cookies onClose={() => setShowCookies(false)} />}
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories
                value={categoryId}
                onClickCategory={onClickCategory}
                categories={categories}
              />
            </div>
            {loading ? ( // Если загрузка
              <div className="content__error-info">
                <h1>Загрузка...</h1>
                <h3>Подождите немного.</h3>
              </div>
            ) : errorBackend ? ( // Если есть ошибка
              <div className="content__error-info">
                <h1>Ошибка сервера</h1>
                <h3>Попробуйте зайти на сайт позже</h3>
              </div>
            ) : ( // Если нет ошибок и загрузка завершена
              hasProducts ? productItems : <div><h1>Нет продуктов для отображения.</h1></div>
            )}
          </div>
        </div>
      </div>
      {scrollPosition > 400 && (
        <button onClick={scrollToTop} className="arrow__button">
          <img className="arrow__image" src={arrow} alt="Top" />
        </button>
      )}
      <Footer />
    </div>
  );
}
