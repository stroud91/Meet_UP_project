'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: "",
        city: "",
        state: "",
        lat: 34.0317,
        lng: -118.6996,
      },
      {
        groupId: 2,
        address: "",
        city: "",
        state: "",
        lat: 33.8123,
        lng: -117.9190,
      },
      {
        groupId: 3,
        address: "",
        city: "",
        state: "",
        lat: 40.7648,
        lng: -73.9745,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['', '', ''] }
    }, {});
  }
};
