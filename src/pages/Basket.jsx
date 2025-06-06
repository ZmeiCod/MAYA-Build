import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

// import pdf from '../assets/document/Пример.pdf'

import { BasketEmpty } from "../components/Basket/BasketEmpty";
import { BasketItem } from "../components/Basket/BasketItem";
import { clearItems } from "../redux/cart/slice";
import { InputField } from "../utils/inputField";
import { phoneNumberChange } from "../utils/phoneCheck";

import basketClear from "../assets/ui/basketClear.svg";
import arrowBasket from "../assets/ui/arrowBack.svg";
import { Helmet } from "react-helmet";

export default function Basket() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isOrderSent, setIsOrderSent] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [payId, setPayId] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("0");
  const [errors, setErrors] = React.useState({});

  const schema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    phone: z
      .string()
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
    address: z.object({
      value: z.string().min(1, "Адрес обязателен"),
    }),
    // isAgreed: z.boolean().refine((value) => value === true, {
    //   message: "Необходимо согласие",
    // }),
  });

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setPayId(event.target.value);
  };

  const products = items.map((item) => item.article);
  const productQuantities = items.map((item) => item.count);

  const productModifiers = {};

  const params = {
    street: address,
    name: name,
    phone: phone,
    descr: description ? description : "",
    pay: payId,
  };

  const formData = new URLSearchParams();

  for (const key in params) {
    formData.append(key, params[key]);
  }

  products.forEach((product, index) => {
    formData.append(`product[${index}]`, product);
    formData.append(`product_kol[${index}]`, productQuantities[index]);

    if (productModifiers[index] !== undefined) {
      formData.append(`product_mod[${index}]`, productModifiers[index]);
    }
  });

  const onClickMakeOrder = () => {
    try {
      schema.parse({
        name,
        phone,
        address: {
          value: address,
        },
        // isAgreed,
        description: description ? description : undefined,
      });
      fetch(`${REACT_APP_API_URL}/api/frontpad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Сетевая ошибка");
          }
          return response.json();
        })
        .then((result) => {
          setIsOrderSent(true);
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
            setIsOrderSent(false);
            setTimeout(() => {
              navigate("/");
            }, 1);
          }, 5000);
        })
        .catch((error) => {
          alert("Произошла ошибка при отправке заказа");
          console.error("Ошибка:", error);
        });
    } catch (e) {
      alert("Вы не заполнили обязательные поля для оформления заказа");
      console.error("Validation errors:", e.errors);
      const validationErrors = e.flatten();
      setErrors(validationErrors.fieldErrors);
    }
  };

  const onClickClear = () => {
    if (window.confirm("Очистить все товары в корзине?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <BasketEmpty />;
  }

  return (
    <div className="app">
      <Helmet>
        <meta
          name="description"
          content="Лучшие блюда — лучшие цены! Роллы, пицца, бургеры от шефа, +7(978)-444-14-14"
        />
        <meta name="keywords" content="Симферополь, доставка, еда, вкусно" />
      </Helmet>
      <Header />
      <div className="wrapper">
        <div className="content">
          <div className="content__basket">
            <div className="container">
              <div className="cart">
                <div className="cart__top">
                  <h1 className="content__title">1. Корзина</h1>
                  <div onClick={onClickClear} className="cart__clear">
                    <img src={basketClear} alt="-" />
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
                <div className="basket__user-data__row info">
                  <div>
                    <InputField
                      label="Имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите имя"
                    />
                    {errors.name && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "10px",
                          paddingLeft: "15px",
                        }}
                      >
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Телефон"
                      value={phone}
                      onChange={(e) => phoneNumberChange(e, setPhone)}
                      placeholder="+7 (___) ___-__-__"
                      mask="+7 (999) 999-99-99"
                    />
                    {errors.phone && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "10px",
                          paddingLeft: "15px",
                        }}
                      >
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="basket__user-data__row">
                  <div>
                    <InputField
                      placeholder="Введите адрес доставки"
                      label="Адрес доставки"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "10px",
                          paddingLeft: "15px",
                        }}
                      >
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>
                <div className="basket__user-data__row">
                  <div>
                    <h3 className="basket__user-data__title">
                      Комментарий к заказу
                    </h3>
                    <textarea
                      className="basket__user-data__input"
                      rows={5}
                      maxLength="100"
                      placeholder="Укажите тут дополнительную информацию для курьера"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="basket__user-data__row">
                  <div>
                    <input
                      type="checkbox"
                      id="approval"
                      checked={isAgreed}
                      onChange={() => setIsAgreed((prev) => !prev)}
                    />
                    <label
                      style={{ marginLeft: "20px" }}
                      htmlFor="approval"
                      className="check-box"
                    >
                      Я даю согласие на обработку персональных данных
                      {/* <a href={pdf} target="_blank" rel="noopener noreferrer" className="basket__link">
                       обработку персональных данных
                    </a> */}
                    </label>
                    {errors.isAgreed && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "10px",
                          paddingLeft: "15px",
                        }}
                      >
                        {errors.isAgreed}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content__basket">
            <div className="container">
              <div className="basket__bottom">
                <div
                  className="basket__bottom__paymant"
                  style={{ display: "flex" }}
                >
                  <div className="basket__bottom--input">
                    <div>
                      <input
                        type="radio"
                        id="1"
                        name="paymentMethod"
                        value="1"
                        checked={paymentMethod === "1"}
                        onChange={handlePaymentChange}
                      />
                      <label
                        style={{ paddingLeft: "15px" }}
                        htmlFor="1"
                        className="check-box"
                      >
                        Наличными
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="2"
                        name="paymentMethod"
                        value="2"
                        checked={paymentMethod === "2"}
                        onChange={handlePaymentChange}
                      />
                      <label
                        style={{ paddingLeft: "15px" }}
                        htmlFor="2"
                        className="check-box"
                      >
                        Картой
                      </label>
                    </div>

                    {errors.paymentMethod && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "10px",
                          paddingLeft: "15px",
                        }}
                      >
                        {errors.paymentMethod}
                      </div>
                    )}
                  </div>

                  <div
                    style={{ marginLeft: "auto" }}
                    className="cart__bottom-details"
                  >
                    <span>
                      Всего товаров: <b>{totalCount}</b>
                    </span>
                    <span>
                      Сумма заказа: <b>{totalPrice} ₽</b>
                    </span>
                  </div>
                </div>
                <div className="cart__bottom-buttons">
                  <Link to="/" className="button pay-btn">
                    <img
                      src={arrowBasket}
                      style={{ paddingRight: "10px" }}
                      alt=""
                    />

                    <span>Вернуться назад</span>
                  </Link>
                  <div onClick={onClickMakeOrder} className="button pay-btn">
                    <span>Заказать</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isOrderSent && isVisible && (
            <div className="notification">Заказ успешно отправлен!</div>
          )}
        </div>
      </div>
    </div>
  );
}
