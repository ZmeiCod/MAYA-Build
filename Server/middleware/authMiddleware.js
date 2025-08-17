const ApiError = require('../error/ApiError')
const tokenService = require('../service/tokenService')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorized("Не авторизован1"));
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorized("Не авторизован2"));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorized("Не авторизован3"));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unauthorized("Не авторизован4"));
  }
};
