import React from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/cart/slice";

import minus from "../../assets/ui/minus.svg";
import plus from "../../assets/ui/plus.svg";
import remove from "../../assets/ui/remove.svg";

export const BasketItem = ({
  id,
  image,
  title,
  price,
  count,
  size,
  article,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        size, // Убедитесь, что размер передается здесь
        price, // не забудьте цену, если она нужна
        // добавьте другие необходимые поля
      })
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem({ id, size })); 
  };
  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить товар из корзины?")) {
      dispatch(removeItem({ id, size })); // Здесь мы передаем и id, и size
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="basket__image" src={image} alt="Product" />
      </div>
      <div className="cart__item-info">
        <h3>
          {title} {article}
        </h3>
        <p>{size} см.</p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <img src={minus} alt="" />
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <img className="" src={plus} alt="" />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count}</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <img src={remove} alt="" />
        </div>
      </div>
    </div>
  );
};
