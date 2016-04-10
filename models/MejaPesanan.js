var Sequelize = require('sequelize');

var MejaPesananModel = function(sequelize, DataTypes) {
  var MejaPesanan = sequelize.define('MejaPesanan', {
    pesananId: {
      type: DataTypes.INTEGER,
      field: 'pesanan_id',
      references: {
        model: 'pesanan',
        key: 'pesanan_id',
      }
    },
    mejaId: {
      type: DataTypes.INTEGER,
      field: 'meja_id',
      references: {
        model: 'meja',
        key: 'meja_id',
      }
    }
  }, {
    tableName: 'meja_pesanan',
    timestamps: false,
  });

  return MejaPesanan;
};


module.exports = MejaPesananModel;
