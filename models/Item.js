var Sequelize = require('sequelize');

var ItemModel = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      field: 'item_id',
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    harga: {
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
    tableName: 'item',
    createdAt: 'tanggalBuat',
    updatedAt: 'tanggalEdit',
    timestamps: true,
    classMethods: {
      associate: function(models) {
          Item.belongsToMany(models.Pesanan, {
            as: 'pesanan',
            through: models.ItemPesanan,
            foreignKey: 'itemId',
            otherKey: 'pesananId',
          });
      }
    }
  });


  return Item;
};


module.exports = ItemModel;
