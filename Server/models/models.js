const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  refreshToken: { type: DataTypes.STRING },
});

const Carousel = sequelize.define('carousel', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  smallImage: { type: DataTypes.STRING, allowNull: false },
})

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  article: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false},
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.INTEGER, allowNull: false },
  
  article40: { type: DataTypes.INTEGER, allowNull: true },
  price40: { type: DataTypes.INTEGER, allowNull: true },
  weight40: { type: DataTypes.INTEGER, allowNull: true },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Product,
  Category,
  Carousel,
};
