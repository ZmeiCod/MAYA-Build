const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");
const userService = require("../service/userService");

class userController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return next(ApiError.badRequest("Ошибка. Не все поля заполнены"));
      }

      const userData = await userService.registration(email, password, role);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      if (error instanceof ApiError) {
        // Если это известная ошибка API, прологи ее статус и сообщение
        console.error(
          `Ошибка при регистрации: Статус ${error.status}, Сообщение: ${error.message}`
        );
        return next(error); // Прокидываем ошибку дальше для корректного ответа клиенту
      } else {
        console.error("Ошибка при регистрации пользователя:", error);
        return next(ApiError.internal("Ошибка при сохранении пользователя."));
      }
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // Проверка на существование пользователя
    if (!user) {
      return next(
        ApiError.badRequest("Недопустимые данные при аутентификации")
      );
    }

    try {
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `Ошибка при аутентификации: Статус ${error.status}, Сообщение: ${error.message}`
        );
        return next(error);
      } else {
        console.error(
          "Неожиданная ошибка при аутентификации пользователя:",
          error
        );
        return next(ApiError.internal("Ошибка при аутентификации"));
      }
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(
          `Ошибка при выходе: Статус ${error.status}, Сообщение: ${error.message}`
        );
        return next(error);
      } else {
        console.error("Неожиданная ошибка при выходе пользователя:", error);
        return next(ApiError.internal("Ошибка при выходе"));
      }
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      console.error("Ошибка при обновлении токена", error);
      return next(ApiError.internal("Ошибка при обновлении токена"));
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.error("Ошибка при получении пользователей", error);
      return next(ApiError.internal("Ошибка при получении пользователей"));
    }
  }
}

module.exports = new userController();
