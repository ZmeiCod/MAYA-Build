import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import basketEmpty from "../../assets/img/basketEmpty.png";

export const BasketEmpty = () => {
  return (
    <div>
      <Header></Header>
      <div className="cart cart--empty">
        <div className="cart text-block">
          <h2>
            Корзина пустая
          </h2>
          <p>
            Вероятней всего, вы не добавили блюдо в корзину
          </p>
        </div>
        <img src={basketEmpty} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
