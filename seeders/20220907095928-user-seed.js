"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        name: "AdminBudi",
        role: "Admin",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "Andi",
        role: "Initiator",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "dila",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "donnie",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "marsha",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "anita",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "lina",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "dhika",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "amel",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "adi",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "gerry",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
      {
        name: "noval",
        role: "Participant",
        updatedAt: new Date (),
        createdAt: new Date ()
      },
    ];
    await queryInterface.bulkInsert("Users", data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
