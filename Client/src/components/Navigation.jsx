import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CategoriesModal from "./CategoriesModal";
import useProducts from "../hooks/useProducts";
import { setCategoryId } from "../redux/filter/slice";

export default function Navigation() {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const { categories } = useProducts(categoryId);
  const location = useLocation();

  // Определяем активный индекс на основе текущего пути
  const getActiveIndex = (path) => {
    switch (path) {
      case "/":
        return 1;
      case "/basket":
        return 2;
      default:
        return 0;
    }
  };

  const [activeIndex, setActiveIndex] = React.useState(getActiveIndex(location.pathname));

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // Меняем состояние модального окна
  };

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обновление activeIndex при изменении пути
  React.useEffect(() => {
    setActiveIndex(getActiveIndex(location.pathname));
  }, [location.pathname]);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="navigation">
      <ul>
        <Link to="/">
          <li
            className={activeIndex === 1 ? "active" : ""}
            onClick={() => handleLinkClick(1)}
          >
            <a href="/">
              <span className="icon">
                <i className="fa-solid fa-home"></i>
              </span>
              <span className="text">Главная</span>
            </a>
          </li>
        </Link>
        <Link to="/basket">
          <li
            className={activeIndex === 2 ? "active" : ""}
            onClick={() => handleLinkClick(2)}
          >
            <a href="/basket">
              <span className="icon">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="сount">{totalCount}</span>
              </span>
              <span className="text">Корзина</span>
            </a>
          </li>
        </Link>
        <div
          className="indicator"
          style={{ transform: `translateX(${(activeIndex - 1) * 70}px)` }} // Обновлено для правильного смещения индикатора
        ></div>
      </ul>
      {isModalOpen && (
        <CategoriesModal
          categories={categories}
          categoryId={categoryId}
          onClickCategory={onClickCategory}
          onClose={toggleModal}
          className={isModalOpen ? "open" : ""}
        />
      )}
    </div>
  );
}
