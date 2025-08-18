import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown } from "react-bootstrap";
import { updateProduct, fetchProducts } from "../../http/productApi";
import { useParams } from "react-router-dom";
import { Context } from "../../index";

const UpdateProduct = ({ show, onHide }) => {
    const { id } = useParams();
    const productContext = React.useContext(Context);
    
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [article, setArticle] = useState(0);
    const [article40, setArticle40] = useState(0);
    const [price, setPrice] = useState(0);
    const [price40, setPrice40] = useState(0);
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState(0);
    const [weight40, setWeight40] = useState(0);
    const [categoryName, setCategoryName] = useState("");

    // Загрузка данных о продукте при открытии модального окна
    useEffect(() => {
        if (show) {
            fetchProducts(id).then(data => {
                setName(data.name);
                setImage(''); // При открытии не загружаем изображение
                setArticle(data.article);
                setArticle40(data.article40);
                setPrice(data.price);
                setPrice40(data.price40);
                setDescription(data.description);
                setWeight(data.weight);
                setWeight40(data.weight40);
                setCategoryName(data.categoryName);
            });
        }
    }, [show, id]);

    const handleUpdate = () => {
        const formData = new FormData();
        
        // Добавляем только измененные поля
        if (image) {
            formData.append("image", image);
        }
        if (name) formData.append("name", name);
        if (article) formData.append("article", article);
        if (article40) formData.append("article40", article40);
        if (price) formData.append("price", price);
        if (price40) formData.append("price40", price40);
        if (description) formData.append("description", description);
        if (weight) formData.append("weight", weight);
        if (weight40) formData.append("weight40", weight40);
        if (categoryName) formData.append("categoryName", categoryName);

        updateProduct(id, formData)
            .then(() => {
                onHide(); // Закрыть модал
            })
            .catch((error) => {
                console.error("Ошибка при обновлении продукта: ", error);
            });
    };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Обновить категорию
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
          {/* <Dropdown className="mt-3 mb-2">
            <Dropdown.Toggle>
              {productContext.selectedCategory.name || "Выберите категорию"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {productContext.categories.map((category) => (
                <Dropdown.Item
                  onClick={() => productContext.setSelectedCategory(category)}
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */}
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
        <Button className="admin-page-btn" onClick={handleUpdate}>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProduct;
