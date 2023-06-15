'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';

    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: "TORONTO ARTS & CULTURE",
        about: `An awesome place for fellow Arts and Culture lovers around our city to meet, attend and organize events, share ideas and interests!

        Join us as we explore Toronto galleries, museums, fairs, and the best in international films, theatre, opera, food, dance, architecture/design,

        music and the avant-garde.

        We will be active with many of the festivals and fairs that take place throughout the year.

        Above all we want to create leading events where people can make new friends while enjoying common interests.

        We ask that if you are joining us, you make Toronto Arts & Culture, one of your Top 3 Toronto Meetup groups.

        Some of our events are quite large, some are intimate. If we can't find you, pls try and find us as best you can.

        If we are not able to connect up, if you are new to our group..don't give up, try again, as we will do! After 3-5 times coming out,

        you will have made some new arts & culture friends.

        If you need to change/update your RSVP, please do so in a timely and professional manner.

        When you join, try and get a picture posted and a bit of info about yourself...its helps in identification at events.

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
        about: `This is a meetup group for everyone who wants to meet new friends through dance lessons and social events.
         After all - dance is a great ice-breaker. Join if you don't want to be on the dance floor alone :)`,
        type: "In person",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 3,
        name: "New York Finance, Trading & Banking Meetup",
        about: `New York Finance And Banking Meetup is a community of professionals at any level whether you are an experienced financial professional

        or looking to start your career or just looking to gather some information about the finance industry .

        If you work in finance or a related industry like investment banking, commercial banking, hedge funds, private equity, public equity,

        LBO, credit, M&A, accounting, economics, consulting, corporate finance, etc. then this is *definitely* the group for you.

        Main event focus: Investment Banking, Sales & Trading, Brokerage, Private Equity, Hedge Funds, Asset Managment,

        Wealth Management, Venture Capital, Angel Investment, Start-Up funding, business networking.

        The purpose of meetups is to bring together and introduce professional members of the New York City financial services industry to one another,

        share helpful information and provide opportunities, as well as to socialize to meet new friends, and to network to improve our connections.

        Anyone who works in the Finance industry knows how important it is to build professional and social networks in different areas of finance to make ourselves more mobile in finance.

        We will provide market commentaries, tutorials, share job vacancies and job availability announcements.

        We aim to bring up to date industry knowledge from the financial industry to you by working with

        financial institutions (Bulge Bracket and Boutique Investment Banks, Bloomberg, Stock Exchange, Hedge Funds and PE firms),

        Business schools to organise events which would be of educational and networking value to you.`,
        type: "Online",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 20,
        name: "New York Pets Meetup",
        about: `All animal lovers are welcome! Let's have fun socializing with this common subject, but not limited to!

        How to find a shelter for adoption, where to find a reliable breeder, what to do in case of an emergency, first time with a pup tips...

        all sort of things and we can also organize outdoor recreation with our loved ones included!`,
        type: "In person",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 4,
        name: "New Jersey Dog Play Group",
        about: `The purpose of this group is to provide dog lovers the opportunity to hang out with other dog lovers and their dogs in public parks in NJ.

        Explore and enjoy the outdoors, and make new, local friends, human and canine!

        Our main activity will be walking throughout central and northern New Jersey and Rockland and Orange County in New York.

        This is a laid back group with easy going outings.

        All walks are free. All breeds of dogs are welcome. Leashes required. Social dogs only. (No aggressive dogs.)

        Dogs must have up to date rabies and distemper vaccinations.

        The safety and care of the animals and their owners cannot be guaranteed but a spay/neuter requirement will reduce the likelihood of

        any unwanted issues. All dogs must be spayed/neutered.`,
        type: "In person",
        private: false,
        city: 'Baskin Ridge',
        state: 'NJ',
      },
      {
        organizerId: 14,
        name: "Cat Lovers in Newport, NJ",
        about: `I would like to start a group for cat lovers and cat owners living in Newport.

        (Or nearby in Jersey City!)

        It would be great if we could not only talk about cats but also deepen our ties as friends in the same area.

        Also, if possible, take a walk with our cats together!

        (In that case, please prepare nice and safe harness and a stroller (or carry bag) for pets)`,
        type: "In person",
        private: false,
        city: 'Jersey City',
        state: 'NJ',
      },
      {
        organizerId: 17,
        name: "Online Yoga",
        about: `A holistic Yoga practice of poses, breathing techniques and meditation-relaxation.

        Improve your flexibility, balance, coordination, strength and endurance by using resistance bands, and gym ball, taking Yoga poses to the next level.

        Practice Yoga from the comfort of your own home with a dedicated group of people who have practiced Yoga for several years consistently, knowing what the connection between the body, breath, and mind is all about.

        Yoga is an ongoing personal journey.
        And, we welcome you to go on your own.

        Pre-registration, and pre-signed consent-waiver form is required for participation.
        Zoom link for participation will be provided upon completion of the same.`,
        type: "Online",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 10,
        name: "Trivia Online!",
        about: `Come and join us as we split into teams and answer questions from the Quiz Bowl archive.
        Come and join us as we split into teams and answer questions from the Quiz Bowl archive.
        Come and join us as we split into teams and answer questions from the Quiz Bowl archive.
        Come and join us as we split into teams and answer questions from the Quiz Bowl archive.`,
        type: "Online",
        private: false,
        city: 'Jacksonville',
        state: 'FL',
      },
      {
        organizerId: 5,
        name: "Online Language Exchange",
        about: `This group meets ONLINE on Tuesday evenings from 6:30-8:30 to practice language and exchange culture in a friendly atmosphere. Participants can sharpen their skills by conversing with native speakers as well as other language learners.

        IMPORTANT: You must click "attend" at least two hours prior to the start of the session. All attendees will receive an email containing the link to join the session.

        All skill levels, from beginner to advanced, are welcome!

        Don't forget to click "attend" so that we can email you the link prior to the start of the session!`,
        type: "Online",
        private: false,
        city: 'Jersey City',
        state: 'NJ',
      },
      {
        organizerId: 6,
        name: "Weekly Meditations (online)",
        about: `The Art of Living would like to invite everyone to experience a deep guided meditation in our weekly meetings online. All are welcome, whether you are looking to combat day-to-day stress using meditation or you'd like to uncover subtle layers of your self by diving deep! No experience in meditation is necessary.

        After the meditation we will engage in a spiritual discussion inspired by wisdom from the Yogic tradition as it relates to our everyday life.`,
        type: "Online",
        private: false,
        city: 'Monachie',
        state: 'NJ',
      },
      {
        organizerId: 19,
        name: "Socialize with Internationals in New York (Online Meetup!)",
        about: `No preparation needed. Just bring your smile and open-mindedness to others!!

        The host will match the members one-on-one to have enjoyable conversations.

        You can communicate with people from all over the world and exchange culture!
        Join us! We look forward to meeting you.

        The hosts are from Episoden, a FREE conversation website!
        Visit Episoden if you want more!`,
        type: "Online",
        private: false,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 15,
        name: "Public Speaking NYC Online (Zoom) - Free Observation Session",
        about: `Overcome public speaking fear with gradual exposure, in a supportive environment. Observe a free trial to see if it's right for you.

        (Average class size: 15-20) Based out of New York City for 30 years, we are now offering these classes online to an international audience.

        This one free trial class is an observation session to see if the $425/10 session program is right for you.

        The instructor will be happy to answer any questions following the session.`,
        type: "Online",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 13,
        name: "Small Business Owners and Virtual Assistants in Action",
        about: `This group is dedicated to bringing together entrepreneurs and virtual assistants who are passionate about growing their businesses

        and achieving success in the digital age.

        Whether you're a small business owner looking to expand your online presence, or a virtual assistant seeking new opportunities and clients,

        this is the perfect community for you.

        Here, you'll have the opportunity to network with other like-minded professionals, share your knowledge and expertise,

        and learn from others who have been in your shoes.

        You'll find helpful resources and tips on topics ranging from marketing and social media to time management and productivity.`,
        type: "In person",
        private: true,
        city: 'New York',
        state: 'NY',
      },
      {
        organizerId: 8,
        name: "Business+Startup+Networking",
        about: `1. Bring together a group of people who love to explore the NYC startup scene and other "business" focused events and professional

        development/networking activities. We will aim to meet at least monthly in New York City. We host guest speakers,

        feature pitches, facilitate venture capital, host networking events,

        and also like to kick back and have fun at dinners and parties.

        2. If we can't host/plan and event, we still want to be your source for great things to do in NYC

        where you can network and also have fun(the best combo!). We will be sending out a daily email of the

        Top Things To Do each day(most will be free too!). The email will also be archived on our message board so people can comment and gather there.

        If we cant host the event ourselves, we still hope members can reach out and get together.`,
        type: "In person",
        private: false,
        city: 'New York',
        state: 'NY',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["TORONTO ARTS & CULTURE","New York Friends & Dance","New York Finance, Trading & Banking Meetup",
      "New York Pets Meetup","New Jersey Dog Play Group","Cat Lovers in Newport, NJ",
      "Online Yoga","Trivia Online!","Online Language Exchange","Weekly Meditations (online)","Socialize with Internationals in New York (Online Meetup!)",
      "Public Speaking NYC Online (Zoom) - Free Observation Session","Small Business Owners and Virtual Assistants in Action","Business+Startup+Networking"] }
    }, {});
  }
};
