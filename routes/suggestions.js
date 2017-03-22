var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

router.get('/', function(req, res, next) {
    var userdata = req.app.get('userdata');
    var callURL = process.env.URL+ process.env.API_KEY+ userdata.TYPE+ userdata.LOCATION+"/+"+ userdata.DISTANCE+"km/"+ userdata.PRIJSMAX+ "+"+ userdata.PRIJSMAX*1.2+ userdata.PAGE+ "&pagesize=25";

    userdata.CHANGED = false;
    console.log(callURL);
    // var shrinkr = req.app.get('userdata');
    // console.log(shrinkr);
    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('suggestions');
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

    if (userdata.LOCATION == ""){
        userdata.LOCATION = "heel-nederland"
    }

    var callURL = process.env.URL+ process.env.API_KEY+ userdata.TYPE+ userdata.LOCATION+"/+"+ userdata.DISTANCE+"km/"+     userdata.PRIJSMAX+ "+"+ userdata.PRIJSMAX*1.2+ userdata.PAGE+ "&pagesize=25";



    request(callURL, function (errorMessage, response, data) {
        console.log(userdata);
            data = JSON.parse(data);
            res.locals.data =  data
            console.log('error:', errorMessage); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.render('suggestions');
        });

});


module.exports = router;
