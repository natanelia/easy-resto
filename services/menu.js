var Promise = require('bluebird');
var models = require('../models');
var sequelize = models.sequelize;

var MenuService = function() {};

MenuService.lihatSemuaMenu = function(params) {
  return models.Item.findAll();
};

MenuService.lihatMenu = function(id) {
  return models.Item.findOne({
    where: {
      id: id,
    }
  });
};

MenuService.tambahMenu = function(params) {
  var req = {
    nama: params.nama,
    harga: params.harga,
  };

  return models.Item.create({
    nama: req.nama,
    harga: req.harga,
  });
}

MenuService.ubahMenu = function(params) {
  var req = {
    id: params.id,
    nama: params.nama,
    harga: params.harga,
  };

  return models.Item.findOne({
    where: {
      id: req.id,
    }
  }).then(function(item) {
    if (item) {
      item.nama = (req.nama) ? req.nama : item.nama;
      item.harga = (req.harga) ? req.harga : item.harga;
      return item.save();
    }
    throw new Error("Menu tidak ditemukan.");
  });
};

MenuService.hapusMenu = function(params) {
  var req = {
    id: params.id,
  };

  return models.Item.findOne({
    where: {
      id: req.id,
    }
  }).then(function(item) {
    if (item) {
      return item.destroy();
    }
    throw new Error("Menu tidak ditemukan.");
  });
};

module.exports = MenuService;
