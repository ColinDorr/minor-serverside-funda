var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

// var userdata = {
//     API_URL :  process.env.URL,
//     API_KEY : process.env.API_KEY,
//     TYPE : "/?type=koop&zo=/",
//     LOCATION : "heel-nederland",
//     DISTANCE : 0,
//     PRIJSMIN : 0,
//     PRIJSMAX : 2147483647,
//     PAGE :"/&page=1",
//     PAGESIZE :"&pagesize=3",
// };

router.get('/', function(req, res, next) {
    var userdata = req.app.get('userdata');
    var callURL = process.env.URL+ process.env.API_KEY+ userdata.TYPE+ userdata.LOCATION+"/+"+ userdata.DISTANCE+"km/"+ userdata.PRIJSMIN+ "+"+ userdata.PRIJSMAX+ userdata.PAGE+ "&pagesize=3";

    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('index');
        console.log('error:', errorMessage); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
});

router.post('/', function(req, res){
    var userdata = req.app.get('userdata');

    userdata.TYPE = req.body.huurOfKoopSelectie;
    userdata.LOCATION = req.body.locatie;
    userdata.DISTANCE = req.body.distance;
    userdata.PRIJSMIN = req.body.prijsMin;
    userdata.PRIJSMAX = req.body.prijsMax;
    console.log(userdata)

    if (userdata.LOCATION == ""){
        userdata.LOCATION = "heel-nederland"
    }

    var callURL = process.env.URL+ process.env.API_KEY+ userdata.TYPE+ userdata.LOCATION+"/+"+ userdata.DISTANCE+"km/"+     userdata.PRIJSMIN+ "+"+ userdata.PRIJSMAX+ userdata.PAGE+ "&pagesize=25";

    res.redirect('results');
});

module.exports = router;
