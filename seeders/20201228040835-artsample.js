'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Arttables', [
      {
        title: "この作品",
        type:　"映画",
        scale: 50,
        sawdate: "2020/01/01",
        onaired: "2020/01/01",
        created: "watasianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "buvushuigiuseh",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "soの作品",
        type:　"画",
        scale: 5,
        sawdate: "2010/01/01",
        onaired: "2004/01/01",
        created: "asianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "gnuvbsibiuebuvies",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "この作品",
        type:　"映画",
        scale: 50,
        sawdate: "2020/01/01",
        onaired: "2020/01/01",
        created: "watasianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "fjiroesogojsrogjserj",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "この作品",
        type:　"映画",
        scale: 50,
        sawdate: "2020/01/01",
        onaired: "2020/01/01",
        created: "watasianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "fhiohvoresphphgp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "この作品",
        type:　"映画",
        scale: 50,
        sawdate: "2020/01/01",
        onaired: "2020/01/01",
        created: "watasianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "friebuvoieavhiose",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "この作品",
        type:　"映画",
        scale: 50,
        sawdate: "2020/01/01",
        onaired: "2020/01/01",
        created: "watasianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "vfioirosejgijrjew@gj",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "この作品",
        type:　"映画",
        scale: 50,
        sawdate: "2020/01/01",
        onaired: "2020/01/01",
        created: "watasianimate",
        thumbnail: "images/s.jpg",
        ftxt: "紹介文",
        user_id: "gfwiojeongiofnviiwo@",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Arttables', null, {});
  }
};
