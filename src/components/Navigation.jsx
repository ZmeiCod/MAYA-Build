import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all";

export default function Navigation() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return null; // Не отображаем навигацию, если ширина экрана меньше или равна 480 пикселей
  }

  return (
    <div className="navigation">
      <ul>
        <li className={activeIndex === 0 ? 'active' : ''} onClick={() => handleLinkClick(0)}>
          <a href="#">
            <span className="icon">
              <i className="fa-solid fa-layer-group"></i>
            </span>
            <span className="text">Меню</span>
          </a>
        </li>
        <Link to='/'>
        <li className={activeIndex === 1 ? 'active' : ''} onClick={() => handleLinkClick(1)}>
          <a href="#">
            <span className="icon">
              <i className="fa-solid fa-home"></i>
            </span>
            <span className="text">Главная</span>
          </a>
        </li>
        </Link>
        <Link to="/basket">
        <li className={activeIndex === 2 ? 'active' : ''} onClick={() => handleLinkClick(2)}>
          <a href="#">
            <span className="icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </span>
            <span className="text">Корзина</span>
          </a>
        </li></Link>
        <div className="indicator" style={{ transform: `translateX(${activeIndex * 70}px)` }}></div>
      </ul>
    </div>
  );
}
