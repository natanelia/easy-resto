var Sequelize = require('sequelize');

var MejaModel = function(sequelize, DataTypes) {
  var Meja = sequelize.define('Meja', {
    id: {
      type: DataTypes.INTEGER,
      field: 'meja_id',
      primaryKey: true,
      autoIncrement: true,
    },
    lantai: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggalBuat: {
      type: DataTypes.DATE,
      field: 'tanggal_buat',
      allowNull: false,
    },
    tanggalEdit: {
      type: DataTypes.DATE,
      field: 'tanggal_edit',
      allowNull: false,
    }
  }, {
    tableName: 'meja',
    createdAt: 'tanggalBuat',
    updatedAt: 'tanggalEdit',
    timestamps: true,
    classMethods: {
      associate: function(models) {
          Meja.belongsToMany(models.Pesanan, {
            through: models.MejaPesanan,
            foreignKey: 'mejaId',
            otherKey: 'pesananId',
          });
      }
    }
  });


  return Meja;
};


module.exports = MejaModel;
