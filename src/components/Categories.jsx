import React from "react";

export default function Categories({ value, onClickCategory, categories }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onClickCategory(0)}
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
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
