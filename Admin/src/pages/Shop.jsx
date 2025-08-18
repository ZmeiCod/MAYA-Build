import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import "../index.css";
import { observer } from "mobx-react-lite";
import ProductList from "../components/ProductList";
import { fetchCategories } from "../http/productApi";
import { Context } from "../index";

const Shop = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    product.fetchProducts();
  }, [product]);

  return (
    <div>
      <NavBar />
      <Container className="custom-container">
        <Row className="mt-3">
          <Col md={2}>
            <CategoryBar />
          </Col>
          <Col md={10}>
            <ProductList />
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Shop;
