import {$api} from "../http/index";

export default class AuthService {
  // Запрос на регистрацию пользователя
  static async registration(email, password) {
    return $api.post("/api/user/registration", { email, password });
  }

  // Запрос на вход в систему
  static async login(email, password) {
    return $api.post("/api/user/login", { email, password });
  }

  // Запрос на выход из системы
  static async logout() {
    return $api.post("/api/user/logout");
  }
}
