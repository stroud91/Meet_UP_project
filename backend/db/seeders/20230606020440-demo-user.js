'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName:'Demo',
        lastName:'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName:'Nemo',
        lastName:'Dora',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName:'John',
        lastName:'Smith',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName:'John',
        lastName:'Doe',
        email: 'johndoe@user.io',
        username: 'johndoe',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName:'Nemodon',
        lastName:'Doramon',
        email: 'nemodoramon@user.io',
        username: 'nemotobefound',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName:'Tobe',
        lastName:'Ornottobe',
        email: 'englishwriter@user.io',
        username: 'youguessedit',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Stu',
        lastName: 'Dent',
        email: 'hitthebooks@user.io',
        username: 'studybuddy',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Ali',
        lastName: 'Bye',
        email: 'farewellgreetings@goodbyes.io',
        username: 'seeyoulater',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Dee',
        lastName: 'Fence',
        email: 'noboundaries@user.io',
        username: 'gatekeeper',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Al',
        lastName: 'Gorithm',
        email: 'codinggenius@user.io',
        username: 'loop_forever',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        firstName: 'Sue',
        lastName: 'Perhero',
        email: 'savingtheday@user.io',
        username: 'capedcrusader',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        firstName: 'Phil',
        lastName: 'Harmonic',
        email: 'musiclover@user.io',
        username: 'tunein',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        firstName: 'Holly',
        lastName: 'Wood',
        email: 'moviestar@user.io',
        username: 'silver_screen',
        hashedPassword: bcrypt.hashSync('password13')
      },
      {
        firstName: 'Dinah',
        lastName: 'Soar',
        email: 'extinctbeast@dinosaurs.io',
        username: 'jurassicfan',
        hashedPassword: bcrypt.hashSync('password14')
      },
      {
        firstName: 'Olive',
        lastName: 'Garden',
        email: 'pastalover@italian.io',
        username: 'breadsticks',
        hashedPassword: bcrypt.hashSync('password15')
      },
      {
        firstName: 'Herb',
        lastName: 'Ivore',
        email: 'plantlover@botany.io',
        username: 'greenfingers',
        hashedPassword: bcrypt.hashSync('password16')
      },
      {
        firstName: 'Anita',
        lastName: 'Rest',
        email: 'sleepyhead@naptime.io',
        username: 'dreamcatcher',
        hashedPassword: bcrypt.hashSync('password17')
      },
      {
        firstName: 'Marshall',
        lastName: 'Arts',
        email: 'fightmaster@martialarts.io',
        username: 'blackbelt',
        hashedPassword: bcrypt.hashSync('password18')
      },
      {
        firstName: 'Iona',
        lastName: 'Ferry',
        email: 'boattravel@islandhopper.io',
        username: 'sailaway',
        hashedPassword: bcrypt.hashSync('password19')
      },
      {
        firstName: 'Paige',
        lastName: 'Keeper',
        email: 'bookmarks@libraries.io',
        username: 'holdmyspot',
        hashedPassword: bcrypt.hashSync('password20')
      },
      {
        firstName: 'Justin',
        lastName: 'Thyme',
        email: 'punctual@ontime.io',
        username: 'clockwatcher',
        hashedPassword: bcrypt.hashSync('password21')
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2','johndoe', 'nemotobefound',
      'youguessedit', 'studybuddy', 'seeyoulater', 'gatekeeper', 'loop_forever', 'capedcrusader',
      'tunein', 'silver_screen', 'jurassicfan' , 'breadsticks', 'greenfingers', 'dreamcatcher',
      'blackbelt', 'sailaway', 'holdmyspot', 'clockwatcher'] }
    }, {});
  }
};
