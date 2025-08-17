const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const ApiError = require("../error/ApiError");
const { Category } = require("../models/models");

class categoryController {
  async create(req, res, next) {
    try {
      let { name } = req.body;
      const { image } = req.files;

      let fileName = uuid() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const category = await Category.create({
        name,
        image: fileName,
      });

      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id },
    });
    return res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { image } = req.files; 
  
    try {
      if (!id) {
        return res.status(404).json({ message: "Категория не найдена" });
      }
  
      const category = await Category.findOne({ where: { id } });
      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }
  
      if (image) {
        const oldImagePath = path.resolve(__dirname, "..", "static", category.image);
  
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Ошибка при удалении старого изображения: ", err);
          } else {
            console.log("Старое изображение успешно удалено");
          }
        });
  
        const fileName = uuid() + ".jpg";
        await image.mv(path.resolve(__dirname, "..", "static", fileName));
        category.image = fileName;
      }

      await category.save();
      return res.json(category);
    } catch (error) {
      console.error("Ошибка при обновлении категории", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const category = await Category.findOne({ where: { id } });

      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }

      const imagePath = path.resolve(__dirname, "..", "static", category.image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении файла: ", err);
          return res
            .status(500)
            .json({ message: "Ошибка при удалении изображения" });
        }
        console.log("Изображение успешно удалено");
      });

      await Category.destroy({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      console.error("Ошибка при удалении категории", error);
      return res.status(500).json({ message: "Ошибка при удалении категории" });
    }
  }
}

module.exports = new categoryController();
