const path = require("path");
const fs = require("fs").promises;
const { v4: uuid } = require("uuid");
const ApiError = require("../error/ApiError");
const { Carousel } = require("../models/models");

class CarouselController {
  // Метод для создания нового слайда
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const { image, smallImage } = req.files;

      // Проверяем, существует ли слайд с таким именем
      const existingCarousel = await Carousel.findOne({ where: { name } });
      if (existingCarousel) {
        throw new Error("Слайд с таким именем уже существует");
      }

      // Генерируем уникальное имя и сохраняем в файловую систему
      const fileName = `${uuid()}.jpg`;
      const fileNameSmall = `${uuid()}.jpg`;

      await Promise.all([
        image.mv(path.resolve(__dirname, "..", "static", fileName)),
        smallImage.mv(path.resolve(__dirname, "..", "static", fileNameSmall)),
      ]);

      // Создаем новый слайд в базе данных с указанными данными
      const carousel = await Carousel.create({
        name,
        image: fileName,
        smallImage: fileNameSmall,
      });

      return res.json(carousel);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // Метод для получения всех слайдов
  async getAll(req, res) {
    const carousels = await Carousel.findAll();
    return res.json(carousels);
  }

  async updateSlide(req, res) {
    const { id } = req.params;
    const { image, smallImage } = req.files;

    try {
      const carousel = await Carousel.findOne({ where: { id } });// Получаем текущий слайд
      if (!carousel) {
        return res.status(404).json({ message: "Слайд не найден." });
    }

      // Удаляем старое большое изображение
      if (image && carousel.image) {
        const oldImagePath = path.resolve(__dirname, "..", "static", carousel.image);
        console.log(oldImagePath)
        await fs.unlink(oldImagePath); // Используем промисы для удаления
        console.log("Старое большое изображение успешно удалено");
        
        const fileName = uuid() + ".jpg";
        await image.mv(path.resolve(__dirname, "..", "static", fileName));
        carousel.image = fileName; // Обновляем имя изображения
      }
  
      // Удаляем старое малое изображение
      if (smallImage && carousel.smallImage) {
        const oldSmallImagePath = path.resolve(__dirname, "..", "static", carousel.smallImage);
        await fs.unlink(oldSmallImagePath);
        console.log("Старое малое изображение успешно удалено");
        
        const smallFileName = uuid() + ".jpg";
        await smallImage.mv(path.resolve(__dirname, "..", "static", smallFileName));
        carousel.smallImage = smallFileName; // Обновляем имя малого изображения
      }
  
      // Сохраняем обновленный объект в базу данных
      await carousel.save();
  
      return res.json(carousel);
    } catch (error) {
      console.error("Ошибка при обновлении слайда: ", error);
      return res.status(500).json({ message: "Ошибка при обновлении слайда." });
    }
  }

  // Метод для удаления слайда по его идентификатору
  async delete(req, res) {
    const { id } = req.params;

    try {
      // Находим слайд по айди и если такого нет, то отдаем ошибку
      const slide = await Carousel.findOne({ where: { id } });
      if (!slide) {
        return res.status(404).json({ message: "Слайд не найден" });
      }

      // Генерируем путь для основного и малого изображений
      const imagePath = path.resolve(__dirname, "..", "static", slide.image);
      const smallImagePath = path.resolve(
        __dirname,
        "..",
        "static",
        slide.smallImage
      );

      // Удаляем изображения из файловой системы
      await Promise.all([
        fs.unlink(imagePath).catch((err) => {
          console.error("Ошибка при удалении файла:", err);
          throw new Error("Ошибка при удалении изображения");
        }),
        fs.unlink(smallImagePath).catch((err) => {
          console.error("Ошибка при удалении файла:", err);
          throw new Error("Ошибка при удалении изображения");
        }),
      ]);

      // Удаляем слайд из базы данных
      await Carousel.destroy({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      console.error("Ошибка при удалении слайда", error);
      return res
        .status(500)
        .json({ message: error.message || "Ошибка при удалении слайда" });
    }
  }
}

module.exports = new CarouselController();
