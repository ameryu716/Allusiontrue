'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Userinfos', [
      {
        mail: 'taro@yamada.jp',
        pass: 'yamada',
        username: "",
        calenddisplay: true,
        selectart: 1,
        watchtime: 34,
        profileimg: "htmlhtml",
        icon: "hhh",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@hanako.jp',
        pass: 'hanahanaa',
        username: "dahana",
        calenddisplay: true,
        selectart: 4,
        watchtime: 38,
        profileimg: "mlhtml",
        icon: "hh",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@yapoi.jp',
        pass: 'yakoinri',
        username: "watasi",
        calenddisplay: false,
        selectart: 1,
        watchtime: 34,
        profileimg: "html",
        icon: "e222",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'tartryru7jp',
        pass: 'ryutttta',
        username: "adahana",
        calenddisplay: true,
        selectart: 6,
        watchtime: 3,
        profileimg: "htmlhtml",
        icon: "hty6",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@yamada.jp',
        pass: 'yamada',
        username: "yamadahana",
        calenddisplay: true,
        selectart: 1,
        watchtime: 34,
        profileimg: "htmlhtml",
        icon: "hhh",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@hanako.jp',
        pass: 'hanahanaa',
        username: "dahana",
        calenddisplay: true,
        selectart: 4,
        watchtime: 38,
        profileimg: "mlhtml",
        icon: "hh",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@yapoi.jp',
        pass: 'yakoinri',
        username: "watasi",
        calenddisplay: false,
        selectart: 1,
        watchtime: 34,
        profileimg: "html",
        icon: "e222",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'tartryru7jp',
        pass: 'ryutttta',
        username: "adahana",
        calenddisplay: true,
        selectart: 6,
        watchtime: 3,
        profileimg: "htmlhtml",
        icon: "hty6",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@yamada.jp',
        pass: 'yamada',
        username: "yamadahana",
        calenddisplay: true,
        selectart: 1,
        watchtime: 34,
        profileimg: "htmlhtml",
        icon: "hhh",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@hanako.jp',
        pass: 'hanahanaa',
        username: "dahana",
        calenddisplay: true,
        selectart: 4,
        watchtime: 38,
        profileimg: "mlhtml",
        icon: "hh",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'taro@yapoi.jp',
        pass: 'yakoinri',
        username: "watasi",
        calenddisplay: false,
        selectart: 1,
        watchtime: 34,
        profileimg: "html",
        icon: "e222",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        mail: 'tartryru7jp',
        pass: 'ryutttta',
        username: "adahana",
        calenddisplay: true,
        selectart: 6,
        watchtime: 3,
        profileimg: "htmlhtml",
        icon: "hty6",
        profiletxt: "ダミーテキストダミーテキストダミーテキスト",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Userinfos', null, {});
  }
};
