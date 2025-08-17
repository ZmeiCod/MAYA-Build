"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Сначала добавляем новый столбец без ограничения NOT NULL
    await queryInterface.addColumn("carousels", "smallImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Заполняем существующие строки значением по умолчанию
    await queryInterface.sequelize.query(`
      UPDATE "carousels"
      SET "smallImage" = 'default_image.jpg'
      WHERE "smallImage" IS NULL;
    `);

    // Теперь изменим столбец, чтобы установить NOT NULL
    await queryInterface.changeColumn("carousels", "smallImage", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Удаляем уникальное значение имени
    await queryInterface.changeColumn("products", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Удаляем уникальное значение имени
    await queryInterface.removeConstraint("products", "products_name_key");
    await queryInterface.removeConstraint("products", "products_name_key1");

    // Добавляем новые столбцы в таблицу users
    await queryInterface.addColumn("users", "refreshToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Убираем добавленные столбцы в обратном порядке
    await queryInterface.removeColumn("users", "refreshToken");

    // Убираем столбец smallImage из таблицы carousels
    await queryInterface.removeColumn("carousels", "smallImage");

    // Изменяем столбец name в таблице products обратно
    await queryInterface.changeColumn("products", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
