import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { deleteCarousel } from "../../http/productApi";
import { useNavigate } from "react-router-dom";
import { ROUTE_HOME } from "../../utils/consts";

const DeletedSlide = ({ show, onHide }) => {
  const api = process.env.REACT_APP_API_URL;
  const [slideName, setSlideName] = useState("");

  const navigate = useNavigate();

  const confirmDeleteSlide = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этот слайд?"
    );
    if (confirmDelete) {
      await delProduct();
    }
  };

  const getSlideIdByName = async (name) => {
    try {
      const response = await fetch(`${api}api/carousel`);
      if (!response.ok) {
        throw new Error("Ошибка при получении слайдов");
      }
      const slides = await response.json();

      const slide = slides.find((slide) => slide.name === name);

      return slide ? slide.id : null;
    } catch (error) {
      console.error("Ошибка при поиске слайда по имени: ", error);
      return null;
    }
  };

  const delProduct = async () => {
    try {
      const id = await getSlideIdByName(slideName);
      if (id) {
        await deleteCarousel(id);
        console.log("Слайд удален");
        navigate(ROUTE_HOME);
      } else {
        alert("Слайд с таким названием не найден.");
      }
    } catch (error) {
      console.error("Ошибка при удалении слайда: ", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить слайд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={slideName}
            onChange={(e) => setSlideName(e.target.value)}
            placeholder={"Введите название для удаления слайда"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Отменить
        </Button>
        <Button className="admin-page-btn" onClick={confirmDeleteSlide}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletedSlide;
