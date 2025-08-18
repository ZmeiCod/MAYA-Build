import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const CategoryBar = observer(() => {
  const { product } = useContext(Context);

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        onClick={() => product.setSelectedCategory({})}
      >
        Все
      </ListGroup.Item>
      {product.categories.map((category) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={category.id === product.selectedCategory.id}
          onClick={() => product.setSelectedCategory(category)}
          key={category.id}
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default CategoryBar;
