"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        title: "Coding for Fun",
        brief: "Submit konten yang menginspirasi generasi muda untuk belajar pemrograman",
        budget: "10000000",
        userId: 2,
        updatedAt: new Date (),
        createdAt: new Date ()
      }
    ];
    await queryInterface.bulkInsert("Challenges", data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Challenges", null, {});
  },
};
