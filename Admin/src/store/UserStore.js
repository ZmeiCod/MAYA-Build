import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

// Класс для управления состоянием пользователя
export default class UserStore {
  // Инициализация состояния
  constructor() {
    this.isAuth = false;
    this.user = {};
    this.isLoading = false;
    makeAutoObservable(this);
  }

  // Методы для установки статуса данных
  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  // Метод для регистрации нового пользователя
  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
      // console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  // Метод для входа пользователя
  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      // console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  // Метод для выхода пользователя
  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e);
    }
  }

  // Метод для проверки статуса аутентификации
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/refresh`,
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
