import React from "react";

function Categories({ value, onClickCategory, categories }) {
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onClickCategory(0)} // 0 будет использоваться для отображения всех категорий
          className={value === 0 ? "active" : ""}
        >
          Все
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onClickCategory(category.id)}
            className={value === category.id ? "active" : ""}
          >
            {category.name} {/* Используем name для отображения */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
