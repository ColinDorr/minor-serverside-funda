var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

var API_URL =  process.env.URL;;
var API_KEY = process.env.API_KEY;
var TYPE = "/?type=koop&zo=/";
var LOCATION = "heel-nederland";
var PAGE ="/&page=1&pagesize=25";

var callURL = API_URL+API_KEY+TYPE+LOCATION+PAGE;

router.get('/', function(req, res, next) {
    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('index');
        console.log('error:', errorMessage); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
});

module.exports = router;
