import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container, Button, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProduct, deleteProduct } from "../http/productApi";
import { observer } from "mobx-react-lite";
import { ROUTE_HOME } from "../utils/consts";
import UpdateProduct from "../components/modals/UpdateProduct";

const ProductPage = observer(() => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const [product, setProduct] = useState({ info: [] });
  const { id } = useParams();
  const navigate = useNavigate();

  const confirmDeleteProduct = () => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этот продукт?");
    if (confirmDelete) {
      delProduct();
    }
  };

  const delProduct = () => {
    deleteProduct(id)
      .then((data) => {
        console.log("Продукт удален");
        navigate(ROUTE_HOME);
      })
      .catch((error) => {
        console.error("Ошибка при удалении продукта: ", error);
      });
  };

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [id]);

  return (
    <div>
      <NavBar />
      <Container
        className="custom-container d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 154 }}
      >
        <Row>
          <Col md={5}>
            <Image
              style={{ borderRadius: "50px" }}
              width={500}
              height={500}
              src={process.env.REACT_APP_API_URL + "api/static/" + product.image}
            />
          </Col>
          <Col md={5} className="d-flex flex-column align-items-center">
            <div className="" style={{ color: "#DB7611" }}>
              <h1>{product.name}</h1>
              <h3>{product.price} рублей</h3>
            </div>
            <div>
              <h3
                key={product.id}
                style={{ textAlign: "justify", color: "#ADADAD" }}
              >
                {product.description}
              </h3>
            </div>
            <Row xs="auto" className="m-3">
              <Button className="product-page-btn" onClick={() => setUpdateVisible(true)}>
                Изменить
              </Button>
              <Button
                className="product-page-btn-delete ms-5"
                onClick={confirmDeleteProduct}
              >
                Удалить
              </Button>
            </Row>
          </Col>
        </Row>
        <UpdateProduct
          show={updateVisible}
          onHide={() => setUpdateVisible(false)}
        />
      </Container>
    </div>
  );
});

export default ProductPage;
