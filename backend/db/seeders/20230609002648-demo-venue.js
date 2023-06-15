'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: "345 Way Lane",
        city: "New York",
        state: "NY",
        lat: 40.7128,
        lng: -74.0060,
      },
      {
        groupId: 2,
        address: "789 Circle Street",
        city: "Jersey City",
        state: "NJ",
        lat: 40.7178,
        lng: -74.0431,
      },
      {
        groupId: 3,
        address: "3456 One Way Lane",
        city: "Baskin Ridge",
        state: "NJ",
        lat: 39.9526,
        lng: -75.1652,
      },
      {
        groupId: 4,
        address: "12 Street Lane",
        city: "Jacksonville",
        state: "FL",
        lat: 30.3322,
        lng: -81.6557,
      },
      {
        groupId: 5,
        address: "12 Street Lane",
        city: "Monachie",
        state: "NJ",
        lat: 50.3322,
        lng: -81.6557,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Venues', {
      city: { [Op.in]: ['New York', 'Jersey City', 'Baskin Ridge', 'Jacksonville', 'Monachie'] }
    }, {});
  }
};
