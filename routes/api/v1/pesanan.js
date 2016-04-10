var express = require('express');
var Promise = require('bluebird');
var url = require('url');

var router = express.Router();
var PesananService = require('../../../services/pesanan.js');

var models = require('../../../models');

router.get('/', function(req, res, next) {
  var query = url.parse(req.url, true).query;

  PesananService.lihatSemuaPesanan(query)
    .then(function(orders) {
      res.status(200).json(orders);
    })
    .catch(function(err) {
      res.status(400).json({
        error: err.message,
      });
    })
});

router.post('/', function(req, res, next) {
  var errors = [];
  if (typeof req.body.items !== 'object' || req.body.items.length === 0) {
    errors.push('Tidak ada item pada pesanan.');
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: errors,
    });
    return;
  }

  PesananService.tambahPesanan({
    jenis: req.body.jenis,
    status: req.body.status,
    items: req.body.items,
    mejaId: req.body.mejaId,
  }).then(function(pesananId) {
    return PesananService.lihatPesanan(pesananId).then(function(pesanan) {
      res.status(200).json(pesanan);
    });
  }).catch(function(err) {
    res.status(400).json({
      error: err.message,
    });
  });
});

router.post('/:id/status', function(req, res, next) {
  PesananService.ubahStatusPesanan({
    id: req.params.id,
    status: req.body.status,
  }).then(function(response) {
    res.status(200).json(response);
  }).catch(function(err) {
    res.status(400).json({
      error: err.message,
    })
  })
});

router.post('/:id/bayar', function(req, res, next) {
  PesananService.bayarPesanan({
    id: req.params.id,
  }).then(function(response) {
    res.status(200).json(response);
  }).catch(function(err) {
    res.status(400).json({
      error: err.message,
    })
  })
});

router.get('/:id', function(req, res, next) {
  PesananService.lihatPesanan(req.params.id)
    .then(function(pesanan) {
      res.status(200).json(pesanan);
    })
    .catch(function(err) {
      res.status(400).json({
        error: err.message,
      });
    })
});

router.put('/:id', function(req, res, next) {
  if (typeof req.body.items !== 'object') {
    req.body.items = [];
  }

  PesananService.ubahPesanan({
    id: req.params.id,
    items: req.body.items,
    status: req.body.status,
    jenis: req.body.jenis,
    mejaId: req.body.mejaId,
  }).then(function(pesananId) {
    return PesananService.lihatPesanan(pesananId).then(function(pesanan) {
      res.status(200).json(pesanan);
    });
  }).error(function(err) {
    res.status(400).json({
      error: err,
    });
  });
});

router.delete('/:id', function(req, res, next) {
  PesananService.hapusPesanan({
    id: req.params.id,
  }).then(function(response) {
    res.status(200).json(response);
    return;
  }).catch(function(err) {
    res.status(400).json({
      error: err.message,
    });
  });
});

module.exports = router;
