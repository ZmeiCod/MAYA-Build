import React from "react";
import { Context } from "../App";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import arrow from "../assets/ui/arrow.svg";
import Cookies from "../components/Cookies";
import Carousel from "../components/Carousel";
import useProducts from "../hooks/useProducts";
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
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const { items, categories, loading, errorBackend } = useProducts(
    categoryId,
    searchValue
  );

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    const cookiesConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookiesConsent="));
    if (!cookiesConsent) {
      setShowCookies(true);
    }
  }, []);

  const getCategoryIdByName = (name) => {
    const category = categories.find((category) => category.name === name);
    return category ? category.id : null;
  };

  // React.useEffect(() => {
  //   getProducts();
  // }, [categoryId, searchValue]);

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
          <div className="productCategory">{category.name}</div>
          <div className="content__items">
            {categoryItems.map((item) => (
              <PizzaBlock
                key={item.id}
                createdAt={item.createdAt}
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
      {/* <Helmet>
        <meta
          name="description"
          content="Лучшие блюда — лучшие цены! Роллы, пицца, бургеры от шефа, +7(978)-444-14-14"
        />
        <meta name="keywords" content="Симферополь, доставка, еда, вкусно" />
      </Helmet> */}
      <Header />
      <Carousel />
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
                <div>Загрузка...</div>
                <p>Подождите немного.</p>
              </div>
            ) : errorBackend ? ( // Если есть ошибка
              <div className="content__error-info">
                <div>Ошибка сервера</div>
                <p>Попробуйте зайти на сайт позже</p>
              </div>
            ) : // Если нет ошибок и загрузка завершена
            hasProducts ? (
              productItems
            ) : (
              <div>
                <div>Нет продуктов для отображения.</div>
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
      <Footer />
    </div>
  );
}
