import React from "react";
// import Search from "./Search";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useSelector } from "react-redux";
import basket from "../assets/ui/basket.svg";
import "@fortawesome/fontawesome-free/js/all";
import honeycombs from "../assets/img/honeycombs.svg";

function Header() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="header">
        <div className="header__honeycombs">
          <img src={honeycombs} alt="" />
        </div>
        <div className="container">
          <Link to="/">
            <div className="header__logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          {/* <Search /> */}
          <div className="header__phone">
            <p>
              Вс-чт. 10.00-23.00 <br /> Пт-сб 10.00-00.00
            </p>
          </div>
          <div className="phone">
            <a href="tel:+79784441414" className="icon">
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="header">
      <div className="header__honeycombs">
        <img src={honeycombs} alt="honeycombs" />
      </div>
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img src={logo} alt="maya logo" />
          </div>
        </Link>
        {/* <Search /> */}
        <div className="header__phone">
          <a href="tel:+79784441414"> + 7 (978) 444 14 14 </a>
          <p>
            Вс-чт. 10.00-23.00 <br /> Пт-сб 10.00-00.00
          </p>
        </div>
        <div className="header__cart">
          <Link to="/basket" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img className="header__button--basket" src={basket} alt="basket" />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
