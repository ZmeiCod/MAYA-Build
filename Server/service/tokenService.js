const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "4h",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  // Сверяем AT клиента с тем, что есть у нас
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await User.findOne({ where: { id: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await User.create({ id: userId, refreshToken });
    return token;
  }

  // Очишаем RT из БД
  async removeToken(refreshToken) {
    const tokenData = await User.update(
      { refreshToken: null },
      { where: { refreshToken } }
    );
    return tokenData;
  }

  // Поиск токена из БД
  async findToken(refreshToken) {
    const tokenData = await User.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
