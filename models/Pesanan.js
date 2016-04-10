var Sequelize = require('sequelize');

var PesananModel = function(sequelize, DataTypes) {
  var Pesanan = sequelize.define('Pesanan', {
    id: {
      type: DataTypes.INTEGER,
      field: 'pesanan_id',
      primaryKey: true,
      autoIncrement: true,
    },
    jenis: {
      type: new DataTypes.ENUM('makan_di_tempat', 'bawa_pulang', 'delivery', ''),
      defaultValue: 'makan_di_tempat',
      allowNull: false,
    },
    status: {
      type: new DataTypes.ENUM('belum_diproses', 'sedang_dimasak', 'sudah_lengkap', 'lunas'),
      defaultValue: 'belum_diproses',
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
    tableName: 'pesanan',
    createdAt: 'tanggalBuat',
    updatedAt: 'tanggalEdit',
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Pesanan.belongsToMany(models.Item, {
          as: 'items',
          through: models.ItemPesanan,
          foreignKey: 'pesananId',
          otherKey: 'itemId',
        });

        Pesanan.belongsToMany(models.Meja, {
          as: 'meja',
          through: models.MejaPesanan,
          foreignKey: 'pesananId',
          otherKey: 'mejaId',
        });
      },
    }
  });


  return Pesanan;
};


module.exports = PesananModel;
