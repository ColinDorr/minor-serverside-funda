var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

var data = {
    API_URL :  process.env.URL,
    API_KEY : process.env.API_KEY,
    TYPE : "/?type=koop&zo=/",
    LOCATION : "heel-nederland",
    DISTANCE : "+0km",
    PRIJSMIN : 0,
    PRIJSMAX : 2147483647,
    PAGE :"/&page=1",
    PAGESIZE :"&pagesize=25",
};

var callURL = data.API_URL+data.API_KEY+data.TYPE+data.LOCATION+"/"+data.DISTANCE+"/"+data.PRIJSMIN+"+"+data.PRIJSMAX+data.PAGE+data.PAGESIZE;
console.log(callURL);

router.get('/', function(req, res, next) {
    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('index');
        console.log('error:', errorMessage); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    });
});

router.post('/', function(req, res){
    data.TYPE =req.body.huurOfKoopSelectie;
    data.LOCATION =req.body.locatie;

    var Userdata = { //  Userdata does not get sent to the results page.
            userTYPE : req.body.huurOfKoopSelectie,
            userLOCATION : req.body.locatie
        }
        console.log (Userdata);

        res.redirect('results');
        res.send(Userdata);
});


module.exports = router;
