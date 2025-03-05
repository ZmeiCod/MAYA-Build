import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/slice";
import plus from "../../assets/ui/plus.svg";

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
      isPizza,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={image} alt="Pizza" />
        <div className="item-block__header">
          <h1 className="item-block__title">{title}</h1>
          <h3 className="item-block__weight">
            {size === 40 ? weight40 : weight} г.
          </h3>
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
          <div className="pizza-block__price">
            {size === 40 ? price40 : price} ₽
          </div>
          <button
            onClick={inClickAdd}
            className="button button--outline button--add item-block__button"
          >
            {addedCount > 0 ? (
              <>
                <img src={plus} alt="" />
                <span>Добавить</span>
                <i>{addedCount}</i>
              </>
            ) : (
              <span>Заказать</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
