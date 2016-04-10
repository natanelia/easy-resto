var express = require('express');
var router = express.Router();

var models = require('../../../models');

router.get('/', function(req, res, next) {
  models.Meja.findAll().then(function(items) {
    res.status(200).json(items);
  });
});

module.exports = router;
