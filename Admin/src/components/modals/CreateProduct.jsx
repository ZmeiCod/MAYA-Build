import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { createProduct, fetchCategories } from "../../http/productApi";

const CreateProduct = observer(({ show, onHide }) => {
  const product = useContext(Context).product;

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [article, setArticle] = useState(0);
  const [article40, setArticle40] = useState(0);
  const [price, setPrice] = useState(0);
  const [price40, setPrice40] = useState(0);
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0);
  const [weight40, setWeight40] = useState(0);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
  }, [product]);

  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("article", `${article}`);

    formData.append("article40", `${article40}`);
    formData.append("price40", `${price40}`);
    formData.append("weight40", `${weight40}`);

    formData.append("price", `${price}`);
    formData.append("categoryId", product.selectedCategory.id);
    formData.append("description", description);
    formData.append("weight", weight);

    createProduct(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое блюдо
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название блюда"
          />
          <Form.Control
            onChange={(e) => setWeight(e.target.value)}
            className="mt-3"
            type="number"
            placeholder="Введите вес блюда"
          />
          <Form.Control
            onChange={(e) => setWeight40(e.target.value)}
            className="mt-3"
            type="number"
            placeholder="Введите дополнительный вес блюда (пицца 40 см)"
          />
          <Form.Control
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-3"
            type="file"
          />
          <Form.Control
            onChange={(e) => setArticle(Number(e.target.value))}
            className="mt-3"
            type="number"
            placeholder="Введите артикул"
          />
          <Form.Control
            onChange={(e) => setArticle40(Number(e.target.value))}
            className="mt-3"
            type="number"
            placeholder="Введите дополнительный артикул (пицца 40 см)"
          />
          <Form.Control
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            type="number"
            placeholder="Введите цену"
          />
          <Form.Control
            onChange={(e) => setPrice40(Number(e.target.value))}
            className="mt-3"
            type="number"
            placeholder="Введите дополнительную цену (пицца 40 см)"
          />
          <Dropdown className="mt-3 mb-2">
            <Dropdown.Toggle>
              {product.selectedCategory.name || "Выберите категорию"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.categories.map((category) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedCategory(category)}
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <textarea
            className="mt-3 form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Добавить описание"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Закрыть
        </Button>
        <Button className="admin-page-btn" onClick={addProduct}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
