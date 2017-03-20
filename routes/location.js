var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config()

// Variables out of the .env file, that store the url and the key of Funda
var URL = process.env.URL;
var KEY = process.env.API_KEY;

// Variables, that can change depending on the users input
var type = "/?type=koop&zo=/";
var location = "heel-nederland";
var page ="/&page=1&pagesize=25";

//Test code
console.log(URL + KEY + type+ location+ page)


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('location', { title: 'Express' });

  var request = require('request');
    request(URL + KEY + type+ location+ page, function (errorMessage, response, data) {
      console.log('error:', errorMessage); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('collected Data:', data); // Print the HTML for the Google homepage.
      res.render('location');
});






});

module.exports = router;
