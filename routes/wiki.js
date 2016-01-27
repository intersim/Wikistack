var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function (req, res, next) {
	// var pages = Page.find({});
	Page.find({}, function(err, pages) {
		// console.log(page);
		// pages.push(page);
		console.log("pages: ", pages);
	})
	.then(function(pages) {
		res.render("index", {pages: pages});
	});
	// console.log(pages);
  // res.json(pages);
});

router.post('/', function (req, res, next) {
  var page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });
  page.save()
  .then(function (page) {
  	res.redirect(page.route);
  })
  .then(null, next);
});

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({urlTitle: req.params.urlTitle}, function (err, newPage) {
    if (err) {
      console.log(err);
    } else {
      res.render('wikipage', {newPage: newPage});
    }
  });
});

module.exports = router;