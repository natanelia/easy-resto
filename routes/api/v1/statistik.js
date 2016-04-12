var express = require('express');
var Promise = require('bluebird');
var url = require('url');

var router = express.Router();
var StatistikService = require('../../../services/statistik.js');

var models = require('../../../models');

router.get('/pemesanan', function(req, res, next) {
  var query = url.parse(req.url, true).query;
  var params = {
    specificity: query.specificity,
    startDate: query.startDate,
    endDate: query.endDate,
  };

  StatistikService.lihatStatistikPemesanan(params)
    .then(function(statistik) {
      res.status(200).json(statistik);
    })
    .catch(function(err) {
      res.status(400).json({
        error: err.message,
      });
    })
});

router.get('/item', function(req, res, next) {
  var query = url.parse(req.url, true).query;
  var params = {
    startDate: query.startDate,
    endDate: query.endDate,
  };

  StatistikService.lihatStatistikItem(params)
    .then(function(statistik) {
      res.status(200).json(statistik);
    })
    .catch(function(err) {
      res.status(400).json({
        error: err.message,
      });
    })
});

router.get('/hari', function(req, res, next) {
  var query = url.parse(req.url, true).query;
  var params = {
    date: query.date,
  };

  StatistikService.lihatStatistikHari(params)
    .then(function(statistik) {
      res.status(200).json(statistik);
    })
    .catch(function(err) {
      res.status(400).json({
        error: err.message,
      });
    })
});

module.exports = router;
