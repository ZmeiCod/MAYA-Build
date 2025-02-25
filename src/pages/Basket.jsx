import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BasketItem } from "../components/BasketItem";
import { clearItems } from "../redux/cart/slice";
import { BasketEmpty } from "../components/BasketEmpty";

import basketClear from "../assets/ui/basketClear.svg";
import arrowBasket from "../assets/ui/arrowBack.svg";

export default function Basket() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isAgreed, setIsAgreed] = React.useState(false);

  const isFormValid = name !== "" && phone !== "" && address !== "" && isAgreed;

  const handleAgreedChange = () => {
    setIsAgreed(!isAgreed);
  };

  const onClickMakeOrder = () => {
    const articles = items.map((item) => item.article); // Извлечение артикулов
    console.log(articles); // Вывод артикулов в консоль
  }

  const onClickClear = () => {
    if (window.confirm("Очистить все товары в корзине?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <BasketEmpty />;
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className="content__basket">
          <div className="container">
            <div className="cart">
              <div className="cart__top">
                <h1 className="content__title">1. Корзина</h1>
                <div onClick={onClickClear} className="cart__clear">
                  <img src={basketClear} />
                  <span>Очистить корзину</span>
                </div>
              </div>
              <div className="content__items">
                {items.map((item) => (
                  <BasketItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="content__basket">
          <div className="container">
            <div className="cart__top">
              <h1 className="content__title">2. Персональная информация</h1>
            </div>
            <div className="basket__user-data">
              <div className="basket__user-data__row">
                <div>
                  <h3 className="basket__user-data__title">Имя</h3>
                  <input
                    className="basket__user-data__input"
                    type="text"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="basket__user-data__title">E-mail</h3>
                  <input
                    className="basket__user-data__input"
                    type="text"
                    placeholder="Введите e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="basket__user-data__title">Телефон</h3>
                  <input
                    className="basket__user-data__input"
                    type="number"
                    placeholder="Введите телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="basket__user-data__row">
                <div>
                  <h3 className="basket__user-data__title">Адрес доставки</h3>
                  <input
                    className="basket__user-data__input"
                    type="text"
                    placeholder="Введите адрес доставки"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="basket__user-data__row">
                <div>
                  <h3 className="basket__user-data__title">
                    Комментарий к заказу
                  </h3>
                  <textarea
                    className="basket__user-data__input"
                    type="text"
                    placeholder="Укажите тут дополнительную информацию для курьера"
                  />
                </div>
              </div>
              <div className="basket__user-data__row">
                <div>
                  <input
                    type="checkbox"
                    id="cbtest"
                    checked={isAgreed}
                    onChange={handleAgreedChange}
                  />
                  <label htmlFor="cbtest" className="check-box">
                    Я даю согласие на обработку моих персональных данных
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content__basket">
          <div className="container">
            <div className="cart__bottom">
              <div>
                <input type="checkbox" id="cbtest" />
                <label htmlFor="cbtest" className="check-box">
                  Наличными
                </label>
                <input type="checkbox" id="cbtest" />
                <label htmlFor="cbtest" className="check-box">
                  Картой
                </label>
              </div>

              <div className="cart__bottom-details">
                <span>
                  Всего товаров: <b>{totalCount}</b>
                </span>
                <span>
                  Сумма заказа: <b>{totalPrice} ₽</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to="/"
                  className="button button--outline button--add go-back-btn"
                >
                  <img src={arrowBasket} style={{ paddingRight: "10px" }} />

                  <span>Вернуться назад</span>
                </Link>
                <div onClick={onClickMakeOrder} className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
