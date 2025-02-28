import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/slice";

function PizzaBlock({
  id,
  article,
  article40,
  image,
  title,
  price,
  price40,
  description,
  weight,
  weight40,
  categoryId,
  isPizza,
}) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const [size, setSize] = React.useState(30);

  const addedCount = cartItem ? cartItem.count : 0;

  const inClickAdd = () => {
    const item = {
      id,
      article: size === 40 ? article40 : article,
      description,
      title,
      price: size === 40 ? price40 : price,
      image,
      weight: size === 40 ? weight40 : weight,
      categoryId,
      size: size,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={image} alt="Pizza" />
        <p>{size === 40 ? article40 : article}</p>
        <div className="item-block__header">
          <h1 className="item-block__title">{title}</h1>
          <h3 className="item-block__weight">{size === 40 ? weight40 : weight} г.</h3>
        </div>
        {isPizza && (
          <div className="pizza-block__selector">
            <ul>
              <li
                onClick={() => setSize(30)}
                className={size === 30 ? "active" : ""}
              >
                30 см.
              </li>
              <li
                onClick={() => setSize(40)}
                className={size === 40 ? "active" : ""}
              >
                40 см.
              </li>
            </ul>
          </div>
        )}
        <div>
          <h3 className="item-block__description">{description}</h3>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {size === 40 ? price40 : price} ₽</div>
          <button
            onClick={inClickAdd}
            className="button button--outline button--add item-block__button"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;