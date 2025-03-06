import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
// import Search from "./Search";
import honeycombs from "../assets/img/honeycombs.svg";
import basket from "../assets/ui/basket.svg";
import { useSelector } from "react-redux";

function Header() {
  const { items, totalPrice } = useSelector((state) => state.cart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

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
          <p>Пн-чт 10.00-23-00 <br /> Пт-вс 10.00-00.00</p>
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
