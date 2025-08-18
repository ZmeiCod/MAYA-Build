import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { updateCategory } from "../../http/productApi";

const UpdateCategory = ({ show, onHide, categoryId }) => {
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState(""); // новое состояние для имени категории
  const api = process.env.REACT_APP_API_URL;

  const getCategoryIdByName = async (name) => {
    try {
      const response = await fetch(`${api}api/category`);
      if (!response.ok) {
        throw new Error("Ошибка при получении категорий");
      }
      const categories = await response.json();

      const category = categories.find((category) => category.name === name);
      console.log(category.id)
      return category ? category.id : null;
    } catch (error) {
      console.error("Ошибка при поиске категории по имени: ", error);
      return null;
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryName) {
      console.error("Введите имя категории для поиска");
      return;
    }

    const foundCategoryId = await getCategoryIdByName(categoryName);
    
    if (!foundCategoryId) {
      console.error("Категория не найдена");
      return;
    }

    if (!image) {
      console.error("Выберите изображение для обновления");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    updateCategory(foundCategoryId, formData)
      .then(() => {
        setImage(null);
        setCategoryName(""); // сбрасываем имя категории
        onHide();
      })
      .catch((error) => {
        console.error("Ошибка при обновлении категории: ", error);
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={"Введите название категории для поиска"}
            required
          />
          <Form.Control
            className="mt-3"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Закрыть
        </Button>
        <Button className="admin-page-btn" onClick={handleUpdateCategory}>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCategory;
