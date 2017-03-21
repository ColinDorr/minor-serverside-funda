var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

var data = {
    API_URL :  process.env.URL,
    API_KEY : process.env.API_KEY,
    TYPE : "/?type=koop&zo=/",
    LOCATION : "heel-nederland",
    DISTANCE : 0,
    PRIJSMIN : 0,
    PRIJSMAX : 2147483647,
    PAGE :"/&page=1",
    PAGESIZE :"&pagesize=25",
};

var callURL = data.API_URL+data.API_KEY+data.TYPE+data.LOCATION+"/+"+data.DISTANCE+"km/"+data.PRIJSMIN+"+"+data.PRIJSMAX+data.PAGE+data.PAGESIZE;

console.log(callURL);

router.get('/', function(req, res, next) {

    // ------------------------------------------------------
    // Here needs to be some code, that can get the data out of a new Userdata file or of the previes script, so it can be used in the new rewuest.
    // ------------------------------------------------------

    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('results');
        console.log('error:', errorMessage); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
});

router.post('/', function(req, res){
    var Userdata = { //  Userdata does not get sent to the results page.
            API_URL :  process.env.URL,
            API_KEY : process.env.API_KEY,
            TYPE : req.body.huurOfKoopSelectie,
            LOCATION : req.body.locatie,
            DISTANCE : req.body.distance,
            PRIJSMIN : req.body.prijsMin,
            PRIJSMAX : req.body.prijsMax,
            PAGE :"/&page=1",
            PAGESIZE :"&pagesize=25",
        }

    var userCallURL = Userdata.API_URL+Userdata.API_KEY+Userdata.TYPE+Userdata.LOCATION+"/"+Userdata.DISTANCE+"/"+Userdata.PRIJSMIN+"+"+Userdata.PRIJSMAX+Userdata.PAGE+Userdata.PAGESIZE;

    request(userCallURL, function (errorMessage, response, data) {
            data = JSON.parse(data);
            res.locals.data =  data
            res.render('results');
            console.log('error:', errorMessage); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });
});


module.exports = router;
