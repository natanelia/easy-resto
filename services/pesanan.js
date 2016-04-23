var Promise = require('bluebird');
var models = require('../models');
var sequelize = models.sequelize;

var PesananService = function() {};

PesananService.lihatSemuaPesanan = function(params) {
  var args = {
    where: {},
    order: '`items`.`tanggal_buat` ASC',
    include: [{
      model: models.Item,
      as: 'items',
    }, {
      model: models.Meja,
      as: 'meja',
    }],
  };
  if (params.status) args.where.status = params.status;
  if (params.jenis) args.where.jenis = params.jenis;

  return models.Pesanan.findAll(args)
  .map(function(pesanan) {
    var items = pesanan.items;
    var totalPrice = 0;
    items.map(function(item) {
      totalPrice += item.harga * item.ItemPesanan.count;
    });
    pesanan.dataValues.totalHarga = totalPrice;

    return Promise.resolve(pesanan);
  });
};

PesananService.lihatPesanan = function(id) {
  return models.Pesanan.findOne({
    where: {
      id: id,
    },
    include: [{
      model: models.Item,
      as: 'items',
    }, {
      model: models.Meja,
      as: 'meja',
    }],
  })
  .then(function(pesanan) {
    var items = pesanan.items;
    var totalPrice = 0;
    items.map(function(item) {
      totalPrice += item.harga * item.ItemPesanan.count;
    });
    pesanan.dataValues.totalHarga = totalPrice;

    return Promise.resolve(pesanan);
  });
};

PesananService.tambahPesanan = function(params) {
  var req = {
    items: params.items,
    mejaId: params.mejaId,
    jenis: params.jenis,
    status: params.status,
  };

  return sequelize.transaction(function(t) {
    var pesananId;
    return models.Pesanan.create(req, {transaction: t})
      .then(function(pesanan) {
        pesananId = pesanan.dataValues.id;

        var promises = [];
        req.items.map(function(item) {
          if (item.count) {
            promises.push(models.ItemPesanan.create({
              pesananId: pesananId,
              itemId: item.id,
              count: item.count,
            }, { transaction: t }));
          }
        });

        if (typeof req.mejaId === 'number') {
          promises.push(models.MejaPesanan.create({
            pesananId: pesananId,
            mejaId: req.mejaId,
          }, { transaction: t }));
        }

        return Promise.all(promises);
      })
      .then(function() {
        return Promise.resolve(pesananId);
      })
      .catch(function(err) {
        t.rollback();
        throw err;
      });
  });
};

PesananService.ubahPesanan = function(params) {
  var req = {
    id: params.id,
    items: params.items,
    jenis: params.jenis,
    status: params.status,
    mejaId: params.mejaId,
  };

  return sequelize.transaction(function(t) {
    var pesananId;
    return models.Pesanan.findOne({
      where: {
        id: req.id,
      },
      transaction: t,
    }).then(function(pesanan) {
      pesanan.jenis = req.jenis ? req.jenis : pesanan.jenis;
      pesanan.status = req.status ? req.status : pesanan.status;
      return pesanan.save();
    }).then(function(pesanan) {
      pesananId = pesanan.dataValues.id;
      var promises = [];
      if (req.items) {
        req.items.map(function(item) {
          if (item.count) {
            promises.push(models.ItemPesanan.findOne({
              where: {
                pesananId: pesananId,
                itemId: item.id,
              }
            }).then(function(itemPesanan) {
              if (itemPesanan) {
                itemPesanan.count = item.count;
                return itemPesanan.save();
              } else {
                return models.ItemPesanan.create({
                  pesananId: pesananId,
                  itemId: item.id,
                  count: item.count,
                });
              }
            }));
          } else {
            promises.push(models.ItemPesanan.findOne({
              where: {
                pesananId: pesananId,
                itemId: item.id,
              }
            }).then(function(itemPesanan) {
              if (itemPesanan) {
                return itemPesanan.destroy();
              }
            }));
          }
        });
      }

      if (typeof req.mejaId === 'number') {
        promises.push(models.MejaPesanan.findOne({
          where: {
            pesananId: pesananId,
          },
        }).then(function(mejaPesanan) {
          if (mejaPesanan) {
            mejaPesanan.mejaId = req.mejaId;
            return mejaPesanan.destroy().then(function() {
              return models.MejaPesanan.create({
                pesananId: pesananId,
                mejaId: req.mejaId,
              }, { transaction: t });
            });
          } else {
            return models.MejaPesanan.create({
              pesananId: pesananId,
              mejaId: req.mejaId,
            }, { transaction: t });
          }
        }));
      } else if (req.mejaId === null) {
        promises.push(models.MejaPesanan.findOne({
          where: {
            pesananId: pesananId,
          },
        }).then(function(mejaPesanan) {
          if (mejaPesanan) {
            return mejaPesanan.destroy();
          }
        }))
      }

      return Promise.all(promises);
    }).then(function() {
      return Promise.resolve(pesananId);
    }).catch(function(err) {
      t.rollback();
      throw err;
    });
  });
};

PesananService.ubahStatusPesanan = function(params) {
  var req = {
    id: params.id,
    status: params.status,
  }

  return PesananService.ubahPesanan(req)
  .then(function(pesanan) {
    return {
      message: 'Berhasil mengubah status pesanan',
    }
  });
}

PesananService.bayarPesanan = function(params) {
  var req = {
    id: params.id,
    status: 'lunas',
  };

  return PesananService.ubahPesanan(req);
}

PesananService.hapusPesanan = function(params) {
  var req = {
    id: params.id,
  }

  return models.Pesanan.findOne({
    where: {
      id: req.id,
    }
  }).then(function(pesanan) {
    if (pesanan) {
      if (pesanan.status === 'belum_diproses') {
        return pesanan.destroy();
      } else {
        throw new Error("Anda tidak bisa menghapus pesanan yang sedang/sudah diproses.");
      }
    } else {
      throw new Error("Pesanan tidak ditemukan");
    }
  });
}

module.exports = PesananService;
