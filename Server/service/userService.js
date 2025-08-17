const bcrypt = require("bcrypt");
const UserDto = require("../DTO/userDTO");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");
const tokenService = require("./tokenService");

class UserService {
  async registration(email, password, role) {
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.badRequest("Недопустимые данные при регистрации");
    }

    if (typeof password !== "string") {
      throw ApiError.badRequest("Недопустимый пароль при регистрации");
    }

    // Хеширование пароля и создание JWT с добавленной проверкой на ошибки
    try {
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({ email, password: hashPassword, role });

      const userDto = new UserDto(user); // id, email

      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto };
    } catch (error) {
      console.error(
        "Ошибка при хешировании пароля или создании пользователя:",
        error
      );
      throw ApiError.internal("Ошибка при сохранении пользователя.");
    }
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    const isPassEquals = await bcrypt.compare(password, user.password);
    
    if (!isPassEquals) {
      throw ApiError.badRequest("Недопустимый пароль при аутентификации");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized("Не авторизован");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized("Не авторизован");
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = new UserService();
