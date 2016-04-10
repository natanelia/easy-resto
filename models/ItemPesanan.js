var Sequelize = require('sequelize');

var ItemPesananModel = function(sequelize, DataTypes) {
  var ItemPesanan = sequelize.define('ItemPesanan', {
    pesananId: {
      type: DataTypes.INTEGER,
      field: 'pesanan_id',
      references: {
        model: 'pesanan',
        key: 'pesanan_id',
      }
    },
    itemId: {
      type: DataTypes.INTEGER,
      field: 'item_id',
      references: {
        model: 'item',
        key: 'item_id',
      }
    },
    count: {
      type: DataTypes.INTEGER,
      field: 'count',
      defaultValue: 0,
      allowNull: false
    }
  }, {
    tableName: 'item_pesanan',
    timestamps: false,
  });

  return ItemPesanan;
};


module.exports = ItemPesananModel;
