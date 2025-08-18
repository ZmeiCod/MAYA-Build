import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createCarousel } from "../../http/productApi";

const CreateCarousel = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const [smallImage, setSmallImage] = useState(null);

  const addCarousel = () => {
    const formData = new FormData();
    formData.append("name", value);
    formData.append("image", image);
    formData.append("smallImage", smallImage);

    createCarousel(formData).then((data) => {
      setValue("");
      setImage(null);
      setSmallImage(null)
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый слайд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название для слайда"}
          />
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="admin-page-btn" onClick={onHide}>
          Закрыть
        </Button>
        <Button className="admin-page-btn" onClick={addCarousel}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCarousel;
