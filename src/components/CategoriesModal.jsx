export default function CategoriesModal({
  categories,
  onClose,
  className,
  onClickCategory,
  categoryId,
}) {
  const handleCategoryClick = (id) => {
    onClickCategory(id);
    onClose();
  };

  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Меню</h2>
        <ul>
          <li
            onClick={() => handleCategoryClick(0)}
            className={categoryId === 0 ? "active" : ""}
          >
            Все
          </li>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={categoryId === category.id ? "active" : ""}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
