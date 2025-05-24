import React from "react";

export default function Navigation() {
  return (
    <div className="navigation">
      <ul>
        <li>
          <a href="#">
            <span className="icon">
            <i class="fa-solid fa-layer-group"></i>
            </span>
            <span className="text">Меню</span>
          </a>
        </li>
        <li className="active">
          <a href="#">
            <span className="icon">
              <i className="fa-solid fa-house"></i>
            </span>
            <span className="text">Главная</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span className="icon">
            <i class="fa-solid fa-cart-shopping"></i>
            </span>
            <span className="text">Корзина</span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
}
