var Promise = require('bluebird');
var models = require('../models');
var sequelize = models.sequelize;

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
var days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

var StatistikService = function() {};

StatistikService.lihatStatistikPemesanan = function(params) {
  var specificity = params.specificity;
  var startDate = (params.startDate);
  var endDate = params.endDate;

  var args = {
    attributes: [],
    where: {},
    group: [],
    order: sequelize.col('Pesanan.tanggal_buat'),
  };

  if (startDate || endDate) args.where.tanggalBuat = {};
  if (startDate && !endDate)
    args.where.tanggalBuat.$gt = new Date(startDate);
  else if (startDate && endDate) {
    args.where.tanggalBuat.$between = [
      new Date(startDate),
      new Date(endDate),
    ];
  } else if (!startDate && endDate) {
    args.where.tanggalBuat.$lt = new Date(endDate);
  }

  var groupByYear = sequelize.fn('year', sequelize.col('Pesanan.tanggal_buat'));
  var groupByMonth = sequelize.fn('month', sequelize.col('Pesanan.tanggal_buat'));
  var groupByWeek = sequelize.fn('week', sequelize.col('Pesanan.tanggal_buat'));
  var groupByDay = sequelize.fn('day', sequelize.col('Pesanan.tanggal_buat'));
  var countQuery = sequelize.fn('COUNT', sequelize.col('*'));

  args.attributes.push([countQuery, 'count']);
  if (specificity === 'yearly') {
    args.group = [groupByYear];
    args.attributes.push([groupByYear, 'year']);
  // } else if (specificity === 'monthly') {
  } else {
    args.group = [groupByYear, groupByMonth];
    args.attributes.push([groupByYear, 'year']);
    args.attributes.push([groupByMonth, 'month']);
  }
  // } else if (specificity === 'weekly') {
  //   args.group = [groupByYear, groupByMonth, groupByWeek];
  //   args.attributes.push([groupByYear, 'year']);
  //   args.attributes.push([groupByMonth, 'month']);
  //   args.attributes.push([groupByWeek, 'week']);
  // } else { //daily
  //   args.group = [groupByYear, groupByMonth, groupByDay];
  //   args.attributes.push([groupByYear, 'year']);
  //   args.attributes.push([groupByMonth, 'month']);
  //   args.attributes.push([groupByDay, 'day']);
  // }

  var result = {
    labels: [],
    series: [],
    data: [],
  };

  return models.Pesanan.findAll(args)
  .then(function(stats) {
    if (specificity === 'yearly') {
      var startYear = stats[0].get('year');
      var endYear = stats[stats.length - 1].get('year');
      for (var i = startYear; i <= endYear; i++) {
        result.labels.push(i);
        if (i === stats[c].get('year')) {
          result.data.push(stats[c].count);
          c++;
        } else {
          result.data.push(0);
        }
      }
    // } else if (specificity === 'monthly') {
    } else {
      var startYear = stats[0].get('year');
      var endYear = stats[stats.length - 1].get('year');
      for (var i = startYear; i <= endYear; i++) {
        if (i !== endYear) {
          for (var j = stats[0].get('month'); j <= 12; j++) {
            result.labels.push([j, i]);
          }
        } else {
          if (startYear === endYear) {
            for (var j = stats[0].get('month'); j <= stats[stats.length - 1].get('month'); j++) {
              result.labels.push([j, i]);
            }
          } else {
            for (var j = 1; j <= stats[stats.length - 1].get('month'); j++) {
              result.labels.push([j, i]);
            }
          }
        }
      }

      var c = 0;
      for (var i = 0; i < result.labels.length; i++) {
        if (stats[c].get('year') === result.labels[i][1] && stats[c].get('month') === result.labels[i][0]) {
          result.data.push(stats[c].get('count'));
          c++;
        } else {
          result.data.push(0);
        }
        result.labels[i] = months[result.labels[i][0] - 1] + ' ' + result.labels[i][1];
      }
    }
    // } else if (specificity === 'weekly') {

    // } else { //daily
    //
    // }

    return result;
  });
};

StatistikService.lihatStatistikItem = function(params) {
  var startDate = params.startDate;
  var endDate = params.endDate;

  var args = {
    include: [{
      model: models.Pesanan,
      as: 'pesanan',
      where: undefined,
    }],
  };

  if (startDate || endDate) args.where.tanggalBuat = {};
  if (startDate && !endDate)
    args.where.tanggalBuat.$gt = new Date(startDate);
  else if (startDate && endDate) {
    args.where.tanggalBuat.$between = [
      new Date(startDate),
      new Date(endDate),
    ];
  } else if (!startDate && endDate) {
    args.where.tanggalBuat.$lt = new Date(endDate);
  }

  var result = {
    labels: [],
    series: [],
    data: [],
  };

  return models.Item.findAll(args).map(function(item) {
    result.labels.push(item.nama);
    result.data.push(item.pesanan.length);
    return item;
  }).then(function() {
    return result;
  });
};

StatistikService.lihatStatistikHari = function(params) {
  if (!params.date) params.date = new Date();

  var startDate = new Date(params.date);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  var endDate = new Date(params.date);
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(0);
  endDate.setMinutes(0);
  endDate.setSeconds(0);

  var args = {
    include: [{
      model: models.Pesanan,
      as: 'pesanan',
      where: {
        tanggalBuat: {
          $between: [startDate, endDate]
        },
      },
    }],
  };

  var result = {
    labels: [],
    series: [],
    data: [],
  };

  return models.Item.findAll(args).map(function(item) {
    result.labels.push(item.nama);
    result.data.push(item.pesanan.length);
    return item;
  }).then(function() {
    return result;
  });
};

module.exports = StatistikService;
