'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    return queryInterface.bulkInsert(options, [
    {
        eventId: 1,
        userId: 5,
        status: 'attending'
    },
    {
        eventId: 2,
        userId: 1,
        status: 'attending'
    },
    {
        eventId: 3,
        userId: 10,
        status: 'attending'
    },
    {
        eventId: 1,
        userId: 7,
        status: 'attending'
    },
    {
        eventId: 4,
        userId: 12,
        status: 'attending'
    },
    {
        eventId: 5,
        userId: 3,
        status: 'attending'
    },
    {
        eventId: 6,
        userId: 15,
        status: 'attending'
    },
    {
        eventId: 7,
        userId: 8,
        status: 'attending'
    },
    {
        eventId: 2,
        userId: 6,
        status: 'attending'
    },
    {
        eventId: 3,
        userId: 19,
        status: 'attending'
    },
    {
        eventId: 4,
        userId: 14,
        status: 'attending'
    },
    {
        eventId: 1,
        userId: 21,
        status: 'attending'
    },
    {
        eventId: 8,
        userId: 17,
        status: 'attending'
    },
    {
        eventId: 9,
        userId: 11,
        status: 'attending'
    },
    {
        eventId: 10,
        userId: 9,
        status: 'attending'
    },
    {
        eventId: 3,
        userId: 2,
        status: 'attending'
    },
    {
        eventId: 5,
        userId: 20,
        status: 'attending'
    },
    {
        eventId: 8,
        userId: 6,
        status: 'attending'
    },
    {
        eventId: 3,
        userId: 4,
        status: 'attending'
    },
    {
        eventId: 7,
        userId: 18,
        status: 'attending'
    },
    {
        eventId: 2,
        userId: 9,
        status: 'attending'
    },
    {
        eventId: 6,
        userId: 12,
        status: 'attending'
    },
    {
        eventId: 6,
        userId: 5,
        status: 'attending'
    },
    {
        eventId: 1,
        userId: 17,
        status: 'attending'
    },
    {
        eventId: 10,
        userId: 8,
        status: 'attending'
    },
    {
        eventId: 9,
        userId: 3,
        status: 'attending'
    },
    {
        eventId: 4,
        userId: 7,
        status: 'attending'
    },
    {
        eventId: 7,
        userId: 16,
        status: 'attending'
    },
    {
        eventId: 8,
        userId: 15,
        status: 'attending'
    },
    {
        eventId: 5,
        userId: 1,
        status: 'attending'
    }], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      status: { [Op.in]: ['attending'] }
    }, {});

  }
};
