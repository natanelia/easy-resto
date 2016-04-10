'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('meja', [
        {
          meja_id: 1,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 2,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 3,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 4,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 5,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 6,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 7,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
        {
          meja_id: 8,
          lantai: 2,
          tanggal_buat: new Date(),
          tanggal_edit: new Date(),
        },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('meja', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
