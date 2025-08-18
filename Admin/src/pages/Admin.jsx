import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import CreateCarousel from "../components/modals/CreateCarousel";
import NavBar from "../components/NavBar";
import DeletedSlide from "../components/modals/DeletedSlide";
import DeletedCategory from "../components/modals/DeletedCategory";
import UpdateCategory from "../components/modals/UpdateCategory";
import UpdateSlide from "../components/modals/UpdateSlide";

const Admin = () => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [deleteSlideVisible, setDeleteSlideVisible] = useState(false);
  const [deleteCategoryVisible, setDeleteCategoryVisible] = useState(false);
  const [updateCategoryVisible, setUpdateCategoryVisible] = useState(false);
  const [updateSlideVisible, setUpdateSlideVisible] = useState(false);

  return (
    <div>
      <NavBar />
      <Container className="d-flex flex-column">
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setProductVisible(true)}
        >
          Добавить новое блюдо
        </Button>
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setCategoryVisible(true)}
        >
          Добавить категорию
        </Button>
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setCarouselVisible(true)}
        >
          Добавить слайды
        </Button>

        <CreateProduct
          show={productVisible}
          onHide={() => setProductVisible(false)}
        />
        <CreateCategory
          show={categoryVisible}
          onHide={() => setCategoryVisible(false)}
        />
        <CreateCarousel
          show={carouselVisible}
          onHide={() => setCarouselVisible(false)}
        />
      </Container>

      <Container className="d-flex flex-column mt-5">
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setUpdateCategoryVisible(true)}
        >
          Изменить категорию
        </Button>

        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setUpdateSlideVisible(true)}
        >
          Обновить слайд
        </Button>

        <UpdateSlide show={updateSlideVisible} onHide={() => setUpdateSlideVisible(false)}/>
        <UpdateCategory show={updateCategoryVisible}
          onHide={() => setUpdateCategoryVisible(false)}/>
      </Container>

      <Container className="d-flex flex-column mt-5">
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setDeleteCategoryVisible(true)}
        >
          Удалить категорию
        </Button>
        <Button
          className="admin-page-btn mt-4 p-2"
          onClick={() => setDeleteSlideVisible(true)}
        >
          Удалить слайды
        </Button>
        <DeletedSlide
          show={deleteSlideVisible}
          onHide={() => setDeleteSlideVisible(false)}
        />
        <DeletedCategory
          show={deleteCategoryVisible}
          onHide={() => setDeleteCategoryVisible(false)}
        />
      </Container>
    </div>
  );
};

export default Admin;
