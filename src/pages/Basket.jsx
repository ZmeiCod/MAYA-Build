import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";

import { BasketEmpty } from "../components/Basket/BasketEmpty";
import { BasketItem } from "../components/Basket/BasketItem";
import { clearItems } from "../redux/cart/slice";
import { InputField } from "../utils/inputField";
import { phoneNumberChange } from "../utils/phoneCheck";

import basketClear from "../assets/ui/basketClear.svg";
import arrowBasket from "../assets/ui/arrowBack.svg";
import { AddressInput } from "../components/Basket/BasketAddressInput";

export default function Basket() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [payId, setPayId] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("0");
  const [errors, setErrors] = React.useState({});

  const schema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    email: z.string().email("Неверный формат электронной почты").optional(),
    phone: z
      .string()
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
    address: z
      .object({
        value: z.string().min(1, "Адрес обязателен"),
      })
      .transform((address) => address.value),
    isAgreed: z.boolean().refine((value) => value === true, {
      message: "Необходимо согласие",
    }),
    paymentMethod: z
      .enum(["1", "2"])
      .refine((value) => value === "1" || value === "2", {
        message: "Выберите метод оплаты",
      }),
  });

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setPayId(event.target.value);
  };

  const products = items.map((item) => item.article);
  const productQuantities = items.map((item) => item.count);

  const productModifiers = {};

  const params = {
    // secret: frontpad,
    street: address,
    name: name,
    phone: phone,
    descr: description ? description : "",
    pay: payId,
    mail: email ? email : "",
  };
  console.log(params);

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

  console.log("Products:", products);
  console.log("Quantities:", productQuantities);
  console.log("FormData:", formData.toString());
  const onClickMakeOrder = () => {
    try {
      schema.parse({
        name,
        email: email ? email : undefined,
        phone,
        address: {
          value: address,
        },
        isAgreed,
        paymentMethod,
        description: description ? description : undefined,
      });
      fetch("http://localhost:5000/api/frontpad", {
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
          alert("status ok");
          console.log(result);
        })
        .catch((error) => {
          alert("status non ok");
          console.error("Ошибка:", error);
        });
    } catch (e) {
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
              <div className="basket__user-data__row">
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
                    label="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите e-mail"
                  />
                  {errors.email && email && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        paddingLeft: "15px",
                      }}
                    >
                      {errors.email}
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
                  <AddressInput
                    placeholder="Введите адрес доставки"
                    label="Адрес доставки"
                    value={address}
                    onChange={(value) => setAddress(value)}
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
                    Я даю согласие на обработку моих персональных данных
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
              <div style={{ display: "flex" }}>
                <div
                  // style={{ display: "flex" }}
                  className="basket__bottom--input"
                >
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
                <Link
                  to="/"
                  className="button button--outline button--add go-back-btn"
                >
                  <img src={arrowBasket} style={{ paddingRight: "10px" }} alt=''/>

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
