'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
    async up(queryInterface, Sequelize) {
      options.tableName = 'Memberships';
      return queryInterface.bulkInsert(options, [
        {
          userId: 1,
          groupId: 1,
          status: "member"
        },
        {
          userId: 2,
          groupId: 1,
          status: "member"
        },
        {
          userId: 3,
          groupId: 1,
          status: "member"
        },
        {
          userId: 4,
          groupId: 2,
          status: "member"
        },
        {
          userId: 5,
          groupId: 2,
          status: "member"
        },
        {
          userId: 6,
          groupId: 2,
          status: "co-host"
        },
        {
          userId: 7,
          groupId: 3,
          status: "member"
        },
        {
          userId: 8,
          groupId: 3,
          status: "member"
        },
        {
          userId: 9,
          groupId: 3,
          status: "member"
        },
        {
          userId: 9,
          groupId: 4,
          status: "member"
        },
        {
          userId: 8,
          groupId: 4,
          status: "member"
        },
        {
          userId: 7,
          groupId: 5,
          status: "co-host"
        },
        {
          userId: 6,
          groupId: 6,
          status: "member"
        },
        {
          userId: 5,
          groupId: 6,
          status: "member"
        },
        {
          userId: 4,
          groupId: 7,
          status: "member"
        },
        {
          userId: 3,
          groupId: 7,
          status: "member"
        },
        {
          userId: 2,
          groupId: 8,
          status: "pending"
        },
        {
          userId: 1,
          groupId: 9,
          status: "member"
        },
        {
          userId: 5,
          groupId: 9,
          status: "member"
        },
        {
          userId: 6,
          groupId: 9,
          status: "member"
        },
        {
          userId: 7,
          groupId: 10,
          status: "pending"
        },
        {
          userId: 10,
          groupId: 7,
          status: "member"
        },
        {
          userId: 10,
          groupId: 8,
          status: "member"
        },
        {
          userId: 11,
          groupId: 6,
          status: "member"
        },
        {
          userId: 12,
          groupId: 7,
          status: "co-host"
        },
        {
          userId: 13,
          groupId: 8,
          status: "member"
        },
        {
          userId: 14,
          groupId: 9,
          status: "member"
        },
        {
          userId: 15,
          groupId: 10,
          status: "co-host"
        },
        {
          userId: 16,
          groupId: 11,
          status: "member"
        },
        {
          userId: 17,
          groupId: 12,
          status: "member"
        },
        {
          userId: 18,
          groupId: 13,
          status: "member"
        },
        {
          userId: 19,
          groupId: 14,
          status: "member"
        },
        {
          userId: 20,
          groupId: 14,
          status: "member"
       },
       {
          userId: 21,
          groupId: 13,
          status: "co-host"
       }], {});
    },

    async down(queryInterface, Sequelize) {

      options.tableName = 'Memberships';
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete(options, {
        id: { [Op.between]: [1, 50] }
      }, {});
    }
  };
