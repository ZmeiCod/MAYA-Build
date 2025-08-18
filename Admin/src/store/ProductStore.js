import { makeAutoObservable } from "mobx";
import { fetchProducts } from "../http/productApi";

// Класс для управлением состоянием товаров
export default class ProductStore {
  // Инициализация состояния
  constructor() {
    this._categories = [];
    this._products = [];
    this._selectedCategory = {};
    makeAutoObservable(this);
  }

  // Методы для установки данных
  setCategories(categories) {
    this._categories = categories;
  }

  setProducts(products) {
    this._products = products;
  }

  setSelectedCategory(category) {
    this._selectedCategory = category;
    this.fetchProducts();
  }

  // Метод для получения продуктов по выбранной категории
  fetchProducts() {
    fetchProducts(this.selectedCategory.id || null ).then((data) => {
      this.setProducts(data.rows);
    });
  }

  // Методы получения данных
  get categories() {
    return this._categories;
  }

  get products() {
    return this._products;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }
}
