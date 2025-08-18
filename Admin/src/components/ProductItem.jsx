import React from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import "../index.css";

const ProductItem = ({ product }) => {
  const history = useNavigate();
  const img = product.image;
  return (
    <Col
      className={"mt-4"}
      onClick={() => history(PRODUCT_ROUTE + "/" + product.id)}
    >
      <Card
        className="product-item-image"
        style={{ width: 200, cursor: "pointer" }}
      >
        <Image
          className="product-item-image"
          style={{ height: 150 }}
          src={process.env.REACT_APP_API_URL + "api/static/"+ img}
        />
        <div className="d-flex justify-content-between align-items-center">
          <div>{product.name}</div>
          <div>{product.price}₽</div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
