var express = require('express');
var router = express.Router();
var request = require('request');

var URL = process.env.URL;
var KEY = process.env.API_KEY;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('location', { title: 'Express' });
});

module.exports = router;
