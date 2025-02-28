import React from "react";
import { Context } from "../App";
import arrow from "../assets/ui/arrow.svg";
import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import { setCategoryId } from "../redux/filter/slice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Home() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const { searchValue } = React.useContext(Context);
  const [items, setItems] = React.useState([]);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [categories, setCategories] = React.useState([]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getProducts = async () => {
    const category = categoryId > 0 ? `categoryId=${categoryId}` : "";
    // const search = searchValue ? `&search=${searchValue}` : "";

    try {
      const response = await axios.get(
        `${REACT_APP_API_URL + "api/"}product?${category}`
      );
      const products = response.data.rows;
      setItems(products);
    } catch (error) {
      alert("Произошла ошибка при получении товаров");
      console.log(error);
      setItems([]);
    }
  };

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(REACT_APP_API_URL + "api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
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
                image={REACT_APP_API_URL + item.image}
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
    <>
      <Carousel/>
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
            {hasProducts ? (
              productItems
            ) : (
              <div className="content__error-info">
                <h1>Блюда не найдены 😕</h1>
                <h3>
                  Попробуйте повторить попытку позже или сделайте корректный
                  поиск.
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
      {scrollPosition > 400 && (
        <button onClick={scrollToTop} className="arrow__button">
          <img className="arrow__image" src={arrow} alt="Top" />
        </button>
      )}
    </>
  );
}
