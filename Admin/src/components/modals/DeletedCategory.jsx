import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { deleteCategory } from "../../http/productApi";
import { useNavigate } from "react-router-dom";
import { ROUTE_HOME } from "../../utils/consts";

const DeletedCategory = ({ show, onHide }) => {
  const api = process.env.REACT_APP_API_URL;
  const [categoryName, setCategoryName] = useState("");

  const navigate = useNavigate();

  const confirmDeleteCategory = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту категорию?"
    );
    if (confirmDelete) {
      await delCategory();
    }
  };

  const getCategoryIdByName = async (name) => {
    try {
      const response = await fetch(`${api}api/category`);
      if (!response.ok) {
        throw new Error("Ошибка при получении категорий");
      }
      const categories = await response.json();

      const category = categories.find((category) => category.name === name);

      return category ? category.id : null;
    } catch (error) {
      console.error("Ошибка при поиске категории по имени: ", error);
      return null;
    }
  };

  const delCategory = async () => {
    try {
      const id = await getCategoryIdByName(categoryName);
      if (id) {
        await deleteCategory(id);
        console.log("Категория удалена");
        navigate(ROUTE_HOME);
      } else {
        alert("Категория с таким названием не найдена.");
      }
    } catch (error) {
      console.error("Ошибка при удалении категории: ", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить категорию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={"Введите название категории для удаления"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Отменить
        </Button>
        <Button className="admin-page-btn" onClick={confirmDeleteCategory}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletedCategory;
