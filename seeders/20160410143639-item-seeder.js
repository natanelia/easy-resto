'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('item', [
      {
        item_id: 1,
        nama: 'Nasi Goreng',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      },
      {
        item_id: 2,
        nama: 'Mie Goreng',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      },
      {
        item_id: 3,
        nama: 'Kwetiaw Goreng',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      },
      {
        item_id: 4,
        nama: 'Bihun Goreng',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      },
      {
        item_id: 5,
        nama: 'Kwetiaw Masak',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      },
      {
        item_id: 6,
        nama: 'Bihun Masak',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      },
      {
        item_id: 7,
        nama: 'Mie Masak',
        harga: 30000,
        tanggal_buat: new Date(),
        tanggal_edit: new Date(),
      }
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
    return queryInterface.bulkDelete('item', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
