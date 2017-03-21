var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();
//  Userdata does not get sent to the suggestions page.
var data = {
    API_URL :  process.env.URL,
    API_KEY : process.env.API_KEY,
    TYPE : "/?type=koop&zo=/",
    LOCATION : "amsterdam",
    DISTANCE : "+5km",
    PRIJSMIN : 0,
    PRIJSMAX : 2147483647,
    PAGE :"/&page=1",
    PAGESIZE :"&pagesize=25",
};

var callURL = data.API_URL+data.API_KEY+data.TYPE+data.LOCATION+"/"+data.DISTANCE+"/"+data.PRIJSMIN+"+"+data.PRIJSMAX+data.PAGE+data.PAGESIZE;
console.log(callURL);

router.get('/', function(req, res, next) {


        // ------------------------------------------------------
        // Here needs to be some code, that can get the data out of a new Userdata file or of the previes script, so it can be used in the new request.
        //
        // And there needs to be filtering and extra options to create a radius around the search.
        // ------------------------------------------------------

    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('suggestions');
        console.log('error:', errorMessage); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
});

module.exports = router;
