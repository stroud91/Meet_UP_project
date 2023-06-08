'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';

    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: "TORONTO ARTS & CULTURE",
        about: `An awesome place for fellow Arts and Culture lovers around our city to meet, attend and organize events, share ideas and interests!

        Join us as we explore Toronto galleries, museums, fairs, and the best in international films, theatre, opera, food, dance, architecture/design, music and the avant-garde.

        We will be active with many of the festivals and fairs that take place throughout the year.

        Above all we want to create leading events where people can make new friends while enjoying common interests.

        We ask that if you are joining us, you make Toronto Arts & Culture, one of your Top 3 Toronto Meetup groups. Some of our events are quite large, some are intimate. If we can't find you, pls try and find us as best you can. If we are not able to connect up, if you are new to our group..don't give up, try again, as we will do! After 3-5 times coming out, you will have made some new arts & culture friends.

        If you need to change/update your RSVP, please do so in a timely and professional manner. When you join, try and get a picture posted and a bit of info about yourself...its helps in identification at events.

        Some of our events are ticketed, some have service charges, but the majority are free.

        We look forward to meeting you soon!`,
        type: 'In person',
        private: false,
        city: 'Toronto',
        state: 'ON',
      },
      {
        organizerId: 2,
        name: "New York Friends & Dance",
        about: `This is a meetup group for everyone who wants to meet new friends through dance lessons and social events. After all - dance is a great ice-breaker. Join if you don't want to be on the dance floor alone :)`,
        type: "In person",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 3,
        name: "New York Finance, Trading & Banking Meetup",
        about: `New York Finance And Banking Meetup is a community of professionals at any level whether you are an experienced financial professional or looking to start your career or just looking to gather some information about the finance industry .

        If you work in finance or a related industry like investment banking, commercial banking, hedge funds, private equity, public equity, LBO, credit, M&A, accounting, economics, consulting, corporate finance, etc. then this is *definitely* the group for you.

        Main event focus: Investment Banking, Sales & Trading, Brokerage, Private Equity, Hedge Funds, Asset Managment, Wealth Management, Venture Capital, Angel Investment, Start-Up funding, business networking.

        The purpose of meetups is to bring together and introduce professional members of the New York City financial services industry to one another, share helpful information and provide opportunities, as well as to socialize to meet new friends, and to network to improve our connections.Anyone who works in the Finance industry knows how important it is to build professional and social networks in different areas of finance to make ourselves more mobile in finance.

        We will provide market commentaries, tutorials, share job vacancies and job availability announcements. We aim to bring up to date industry knowledge from the financial industry to you by working with financial institutions (Bulge Bracket and Boutique Investment Banks, Bloomberg, Stock Exchange, Hedge Funds and PE firms), Business schools to organise events which would be of educational and networking value to you.`,
        type: "Online",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
      // {
      //   organizerId: 1,
      //   name: "",
      //   about: ``,
      //   type: "",
      //   private: false,
      //   city: '',
      //   state: '',
      // },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["TORONTO ARTS & CULTURE","New York Friends & Dance","New York Finance, Trading & Banking Meetup"] }
    }, {});
  }
};
