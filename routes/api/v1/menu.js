var express = require('express');
var router = express.Router();
var MenuService = require('../../../services/menu');

router.get('/', function(req, res, next) {
  MenuService.lihatSemuaMenu()
  .then(function(menus) {
    res.status(200).json(menus);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

router.post('/', function(req, res, next) {
  var params = {
    nama: req.body.nama,
    harga: req.body.harga,
  };

  MenuService.tambahMenu(params)
  .then(function(menu) {
    res.status(200).json(menu);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

router.get('/:id', function(req, res, next) {
  MenuService.lihatMenu(req.params.id)
  .then(function(menu) {
    res.status(200).json(menu);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

router.put('/:id', function(req, res, next) {
  var params = {
    id: req.params.id,
    nama: req.body.nama,
    harga: req.body.harga,
  };

  MenuService.ubahMenu(params)
  .then(function(menu) {
    res.status(200).json(menu);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

router.delete('/:id', function(req, res, next) {
  var params = {
    id: req.params.id,
  };

  MenuService.hapusMenu(params)
  .then(function(menu) {
    res.status(200).json(menu);
  })
  .catch(function(err) {
    res.status(400).json(err);
  });
});

module.exports = router;
