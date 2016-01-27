var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function (req, res, next) {

  res.redirect('/');
});

router.post('/', function (req, res, next) {

  var page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });
  page.save(function (err) {
    if (err) console.log(err);
    res.json(page);
  });
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({urlTitle: req.params.urlTitle}, function (err, newPage) {
    if (err) {
      console.log(err)
    } else {
      res.json(newPage);
    }
  });
});

module.exports = router;