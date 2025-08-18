import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { updateSlide } from "../../http/productApi";
import { useNavigate } from "react-router-dom";
import { ROUTE_HOME } from "../../utils/consts";

const UpdateSlide = ({ show, onHide }) => {
  const api = process.env.REACT_APP_API_URL;
  const [slideName, setSlideName] = useState("");
  const [image, setImage] = useState(null);
  const [smallImage, setSmallImage] = useState(null);

  const navigate = useNavigate();

  const confirmUpdateSlide = async () => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите обновить этот слайд?"
    );
    if (confirmDelete) {
      await Update();
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

  const Update = async () => {
    try {
      const id = await getSlideIdByName(slideName);
      if (id) {
        const formData = new FormData();
        if (image) formData.append("image", image);
        if (smallImage) formData.append("smallImage", smallImage);

        await updateSlide(id, formData);
        console.log("Слайд успешно обновлен");
        navigate(ROUTE_HOME);
      } else {
        alert("Слайд с таким названием не найден.");
      }
    } catch (error) {
      console.error("Ошибка при обновлении слайда:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Обновить существующий слайд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={slideName}
            onChange={(e) => setSlideName(e.target.value)}
            placeholder={"Введите название слайда"}
          />
        </Form>
        <h5 className="mt-3">Большое фото</h5>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <h5 className="mt-3">Малое фото</h5>
        <Form.Control
          type="file"
          onChange={(e) => setSmallImage(e.target.files[0])}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Отменить
        </Button>
        <Button className="admin-page-btn" onClick={confirmUpdateSlide}>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSlide;
