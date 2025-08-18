import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createCategory } from "../../http/productApi";

const CreateCategory = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);

  const addCategory = () => {
    const formData = new FormData();
    formData.append("name", value);
    formData.append("image", image);

    createCategory(formData).then((data) => {
      setValue("");
      setImage(null);
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить категорию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите название категории"}
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
        <Button className="admin-page-btn" onClick={addCategory}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;
