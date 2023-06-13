'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
      // Seed images for groups
      let groupImages = [
        { imageURL: 'https://harveykalles.com/wp-content/uploads/2021/11/What-Makes-Toronto-a-Central-Hub-for-Arts-and-Culture-.jpg', imageableId: 1, imageableType: 'group', preview: "true" },
        { imageURL: 'https://pyxis.nymag.com/v1/imgs/0fe/ac3/a00f79271c76cc725b7ae7b7d300aa30de-DSC-0216v2.rhorizontal.w1100.jpg', imageableId: 2, imageableType: 'group' },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcFnXqrKLywMQ49LQ_vZLJrENJRpvM3JjX6-HkDZiwa7E1hKPqmauc3O6p8OjPw5rkaJE&usqp=CAU', imageableId: 3, imageableType: 'group', preview: "true" },
        { imageURL: 'https://secure.meetupstatic.com/photos/event/4/4/5/9/600_20957497.jpeg', imageableId: 4, imageableType: 'group', preview: "true" },
        { imageURL: 'https://puppyuniversityusa.com/wp-content/uploads/2022/08/Dog-Daycare-in-New-Union-City-Jersey-scaled-e1661194914672.jpg', imageableId: 5, imageableType: 'group', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiucvVtBb77yC8gzoa5CqjmNkL0s3aNXQxPJ3-T-2gKhlJUnUo9KXWKE4W7241FHIwqO0&usqp=CAU', imageableId: 6, imageableType: 'group', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwQdtOZSbqmwWnlCQq79nNRuuYCeexjNIWgw&usqp=CAU', imageableId: 7, imageableType: 'group', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLtuaWG_GwLKZIlBO_YXJ9WWbrqS3H0pDomrfC-WNnCirYSbT2RQ8EPp3Urhu7KXuCpw&usqp=CAU', imageableId: 8, imageableType: 'group', preview: "true" },
        { imageURL: 'https://www.easylanguageexchange.com/wp-content/uploads/2016/06/elelogo-340.png', imageableId: 9, imageableType: 'group',preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXAHnRqIgcB3HFIEHHQcKngvsLS0aAB4YBBQ&usqp=CAU', imageableId: 10, imageableType: 'group', preview: "true" },
        { imageURL: 'https://secure-content.meetupstatic.com/images/classic-events/512166401/676x676.jpg', imageableId: 11, imageableType: 'group', preview: "true" },
        { imageURL: 'https://coursehorse.imgix.net/images/course/326/main/shutterstock_119582476.jpg?auto=format%2Cenhance%2Ccompress&crop=entropy&fit=crop&h=220&ixlib=php-1.2.1&q=90&w=330', imageableId: 12, imageableType: 'group', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8_jGfBcZ0GvvS2eWFEb_wK2-5S5iInUajw&usqp=CAU', imageableId: 13, imageableType: 'group', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNT92_g0tv4Y7JFv0h7rQwNuiISk_rF8ZjLw&usqp=CAU', imageableId: 14, imageableType: 'group', preview: "true" }
      ];

      // Seed images for events
      let eventImages = [
        { imageURL: 'https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,f_auto,h_539,q_60,w_718/v1/goldenapron/629e76e3f36a8.jpg', imageableId: 1, imageableType: 'event', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPf21d86H5E9KwQwxH_haaf6-G_tGXzzw4JA&usqp=CAU', imageableId: 2, imageableType: 'event', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMoWOrgwCrv_HawtCf89wFzlN-O9Bvd3-UwA&usqp=CAU', imageableId: 3, imageableType: 'event', preview: "true" },
        { imageURL: 'https://cdn.revolutionise.com.au/logos/qqbzkzhgv6g3dreh.png', imageableId: 4, imageableType: 'event', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWHJWnOQ5H_uZZ3Aixg27NncoIYRfNNGMS-RUxUCtDnaoKiY64JJpIP7D-gU7IQzEHug&usqp=CAU', imageableId: 5, imageableType: 'event', preview: "true" },
        { imageURL: 'https://static01.nyt.com/images/2019/10/01/science/00SCI-CATS1/merlin_102054072_34962289-a2a4-4c52-9969-4b2719347e76-articleLarge.jpg?quality=75&auto=webp&disable=upscale', imageableId: 6, imageableType: 'event', preview: "true" },
        { imageURL: 'https://photos.bringfido.com/posted/2021/07/30/20190615_113009.jpg?size=tile&density=2x', imageableId: 7, imageableType: 'event', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc3nw55l8taNv-Xa48Cbcw9ux25sJYODfuZw&usqp=CAU', imageableId: 8, imageableType: 'event', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17dFWiGhBCJKl9YEw8Ij8qQ55njC5qRG3Gg&usqp=CAU', imageableId: 9, imageableType: 'event', preview: "true" },
        { imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5SlCqlZs-KxmqfvYvxSc_usLfACk5GDdUg&usqp=CAU', imageableId: 10, imageableType: 'event', preview: "true" }
      ];

      return queryInterface.bulkInsert('Images', [...groupImages, ...eventImages]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Images';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    imageableId: { [Op.between]: [1, 30] },
    imageableType: { [Op.in]: ['Group', 'Event'] }
  }, {});
  }
};
