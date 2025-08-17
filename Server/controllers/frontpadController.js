const fetch = require("node-fetch");
const FormData = require("form-data");
const ApiError = require("../error/ApiError");

class frontpadController {
  async create(req, res, next) {
    try {
      const {
        street,
        name,
        phone,
        descr = "",
        pay,
        product = [],
        product_kol = [],
        product_mod = [],
      } = req.body;

      const padProduct = (items) => {
        return Array.isArray(items)
          ? items.map((val) => String(parseInt(val, 10)).padStart(5, "0"))
          : [String(parseInt(items, 10)).padStart(5, "0")];
      };

      const padPhone = () => {
        return phone.replace(/[\s\(\)\-\+]/g, "");
      };

      const products = padProduct(product);
      const quantities = product_kol || [];
      const modifiers = product_mod || [];

      const formData = new FormData();

      const params = {
        secret: process.env.API_FRONTPAD,
        street,
        name,
        phone: padPhone(),
        descr,
        pay,
      };

      console.log(
        `[${new Date().toISOString()}] Отправка данных клиента в Frontpad: \n`,
        JSON.stringify({ ...params, secret: undefined }, null, 2)
      );

      // Заполняем formData основными параметрами
      Object.entries(params).forEach(([key, value]) =>
        formData.append(key, value)
      );

      products.forEach((productItem, index) => {
        formData.append(`product[${index}]`, productItem);
        formData.append(`product_kol[${index}]`, quantities[index] || 0);
        if (modifiers[index] !== undefined) {
          formData.append(`product_mod[${index}]`, modifiers[index]);
        }
      });

      console.log(
        `[${new Date().toISOString()}] Отправка продуктов в Frontpad: \n`,
        JSON.stringify(products, null, 2)
      );

      const response = await fetch(
        "https://app.frontpad.ru/api/index.php?new_order",
        {
          method: "POST",
          body: formData,
        }
      );

      let responseData;
      try {
        responseData = await response.json();
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Ошибка парсинга JSON из API Frontpad:`,
          error
        );
        throw new Error(`Ошибка обработки ответа API: ${error.message}`);
      }

      // Проверяем, содержит ли ответ ключ "result"
      if (!responseData.result) {
        console.error(
          `[${new Date().toISOString()}] Неизвестный формат ответа от API Frontpad:`,
          responseData
        );
        return res.status(500).json({
          message: "Неожиданный ответ от API Frontpad",
          response: responseData,
        });
      }

      // Успешный ответ API
      if (responseData.result === "success") {
        console.log(`[${new Date().toISOString()}] Успешный ответ от API Frontpad: 
          - Order ID: ${responseData.order_id} 
          - Order Number: ${responseData.order_number || "Не указан"}`);

        // Проверяем, есть ли предупреждения
        if (responseData.warnings) {
          console.warn(
            `[${new Date().toISOString()}] Предупреждения от API Frontpad:`,
            JSON.stringify(responseData.warnings, null, 2)
          );
        }

        return res.status(200).json({
          message: "Данные успешно отправлены в Frontpad",
          response: responseData,
        });
      }

      // Ошибка API
      if (responseData.result === "error") {
        console.error(
          `[${new Date().toISOString()}] Ошибка API Frontpad: ${
            responseData.error
          }`
        );

        return res.status(400).json({
          message: "Ошибка при отправке в Frontpad",
          error: responseData.error,
        });
      }

      // Если ответ неожиданный
      console.error(
        `[${new Date().toISOString()}] Неизвестный формат ответа от API Frontpad:`,
        responseData
      );
      res.status(500).json({
        message: "Неожиданный ответ от API Frontpad",
        response: responseData,
      });
    } catch (e) {
      console.error(`[${new Date().toISOString()}] Ошибка:`, e.message);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new frontpadController();
