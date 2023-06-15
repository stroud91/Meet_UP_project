'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 2,
        name: "Dance Social Extravaganza",
        description: `Join us for an incredible evening filled with energy and fun at our Dance Social Extravaganza!
                      Learn some new dance moves and meet amazing people. We will have dance instructors to guide you
                      through salsa, tango, and bachata. No experience necessary, just come to have a great time!`,
        type: "In person",
        capacity: 100,
        price: 20,
        startDate: new Date("2024-07-05T18:00:00"),
        endDate: new Date("2024-07-05T22:00:00")
      },
      {
        venueId: 2,
        groupId: 1,
        name: "TORONTO ARTS & CULTURE Grand Opening",
        description: `We're thrilled to invite you to the grand opening of TORONTO ARTS & CULTURE. Join us for a day of exploration and cultural engagement. Meet fellow art lovers, explore our exhibits, and enjoy our hospitality. See you there!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-01T09:30:00"),
        endDate: new Date("2024-07-01T11:00:00")
      },
      {
        venueId: 3,
        groupId: 2,
        name: "Dance Social",
        description: `Join us for an evening of fun and dance! Whether you're an expert or a beginner, this is a great opportunity to meet new people and enjoy a night of social dancing. Let's create some unforgettable moments together!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-02T09:30:00"),
        endDate: new Date("2024-07-02T11:00:00")
      },
      {
        venueId: 4,
        groupId: 3,
        name: "Pets in the Park",
        description: `Bring your furry friends for a fun day in the park! We'll have games, activities, and lots of opportunities to meet other pet lovers. Let's enjoy a wonderful day together!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-03T09:30:00"),
        endDate: new Date("2024-07-03T11:00:00")
      },
      {
        venueId: 5,
        groupId: 4,
        name: "Dog Play Day",
        description: `Bring your dogs for a day of play at our beautiful venue! We've got plenty of space for them to run, play, and interact with other dogs. And of course, there will be plenty of opportunities for you to meet and chat with other dog owners.`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-04T09:30:00"),
        endDate: new Date("2024-07-04T11:00:00")
      },
      {
        venueId: 1,
        groupId: 5,
        name: "Cat Lovers Gathering",
        description: `Join us for an afternoon of feline fun! This is a chance for cat owners and lovers to meet, share stories, and enjoy each other's company. We might even have some special guests - some of our favorite felines!`,
        type: "In person",
        capacity: 3000,
        price: 10,
        startDate: new Date("2024-07-05T09:30:00"),
        endDate: new Date("2024-07-05T11:00:00")
      },
      {
        venueId: 3,
        groupId: 4,
        name: "New Jersey Dog Play Group - Summer Playdate",
        description: `Bring your furry friends for a fun-filled day at the park! There will be
                      off-leash play areas, water stations, and treats for the dogs. Socialize with
                      fellow dog lovers and let your pet make some new friends too. Don't forget your camera!`,
        type: "In person",
        capacity: 50,
        price: 0,
        startDate: new Date("2024-07-12T10:00:00"),
        endDate: new Date("2024-07-12T13:00:00")
      },
      {
        venueId: 2,
        groupId: 5,
        name: "Cat Lovers Meetup - Cat Cafe Day",
        description: `For all cat lovers in and around Newport, let's get together for a purrfect day at the Cat Cafe!
                      Spend time with adorable cats, enjoy coffee and snacks, and socialize with fellow cat enthusiasts.
                      Don't have a cat? This might be your chance to adopt one!`,
        type: "In person",
        capacity: 25,
        price: 5,
        startDate: new Date("2024-07-19T14:00:00"),
        endDate: new Date("2024-07-19T16:00:00")
      },
      {
        venueId: 4,
        groupId: 10,
        name: "Online Trivia Night Extravaganza",
        description: `Get ready for an exciting Online Trivia Night! Team up with friends or play solo.
                      We'll have questions ranging from pop culture and history to science and sports.
                      There's something for everyone! It's a great way to challenge yourself and meet new people.`,
        type: "Online",
        capacity: 100,
        price: 0,
        startDate: new Date("2024-07-22T20:00:00"),
        endDate: new Date("2024-07-22T22:00:00")
      },
      {
        venueId: 5,
        groupId: 6,
        name: "Mindful Meditations - Online Weekly Session",
        description: `Join us for a guided meditation session from the comfort of your own home.
                      Perfect for beginners and experienced practitioners alike. Our guided meditation
                      focuses on mindfulness and stress relief techniques. Take a break from your busy life
                      and find some inner peace.`,
        type: "Online",
        capacity: 100,
        price: 0,
        startDate: new Date("2024-07-25T18:00:00"),
        endDate: new Date("2024-07-25T19:00:00")
      },



    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      venueId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
