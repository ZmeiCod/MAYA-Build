const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const ApiError = require("../error/ApiError");
const { Product } = require("../models/models");

class productController {
  async create(req, res, next) {
    try {
      let {
        name,
        price,
        categoryId,
        article,
        description,
        weight,
        article40,
        price40,
        weight40,
      } = req.body;
      const { image } = req.files;

      let fileName = uuid() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        categoryId,
        image: fileName,
        article,
        description,
        weight,
        article40,
        price40,
        weight40,
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { categoryId } = req.query;
    let products;
    const whereConditions = {};

    if (categoryId) {
      whereConditions.categoryId = categoryId;
    }

    products = await Product.findAndCountAll({
      where: whereConditions,
    });

    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      price,
      categoryId,
      article,
      description,
      weight,
      article40,
      price40,
      weight40,
    } = req.body;

    let image = null;
    if (req.files && req.files.image) {
      image = req.files.image;
    }

    try {
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      if (image) {
        const oldImagePath = path.resolve(
          __dirname,
          "..",
          "static",
          product.image
        );

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Ошибка при удалении старого изображения: ", err);
          } else {
            console.log("Старое изображение успешно удалено");
          }
        });

        const fileName = uuid() + ".jpg";
        await image.mv(path.resolve(__dirname, "..", "static", fileName));
        product.image = fileName;
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.categoryId = categoryId || product.categoryId;
      product.article = article || product.article;
      product.description = description || product.description;
      product.weight = weight || product.weight;
      product.article40 = article40 || product.article40;
      product.price40 = price40 || product.price40;
      product.weight40 = weight40 || product.weight40;

      console.log("Обновленный объект продукта: ", product);

      await product.save();

      return res.status(200).json(product);
    } catch (error) {
      console.error("Ошибка при обновлении продукта", error);
      return res
        .status(500)
        .json({ message: "Ошибка при обновлении продукта" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      const deletedCount = await Product.destroy({ where: { id } });
      const imagePath = path.resolve(__dirname, "..", "static", product.image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении файла: ", err);
          return res
            .status(500)
            .json({ message: "Ошибка при удалении изображения" });
        }
        console.log("Блюдо успешно удалено");
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Ошибка при удалении продукта", error);
      return res.status(500).json({ message: "Ошибка при удалении продукта" });
    }
  }
}

module.exports = new productController();
