var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').config();

router.get('/', function(req, res, next) {
    var userdata = req.app.get('userdata');
    var callURL = process.env.URL+ process.env.API_KEY+ userdata.TYPE+ userdata.LOCATION+"/+"+ userdata.DISTANCE+"km/"+ userdata.PRIJSMIN+ "+"+ userdata.PRIJSMAX+ userdata.PAGE+ "&pagesize=25";

    userdata.CHANGED = false;
    console.log(callURL);
    // var shrinkr = req.app.get('userdata');
    // console.log(shrinkr);
    request(callURL, function (errorMessage, response, data) {
        data = JSON.parse(data);
        res.locals.data =  data
        res.render('results');
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

    var callURL = process.env.URL+ process.env.API_KEY+ userdata.TYPE+ userdata.LOCATION+"/+"+ userdata.DISTANCE+"km/"+     userdata.PRIJSMIN+ "+"+ userdata.PRIJSMAX+ userdata.PAGE+ "&pagesize=25";



    request(callURL, function (errorMessage, response, data) {
        console.log(userdata);
            data = JSON.parse(data);
            res.locals.data =  data
            console.log('error:', errorMessage); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.render('results');
        });

});

router.get('/:index', function(req,res){
	var id = req.params.index;
    var detailHouse = "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/"+process.env.API_KEY + "/koop/" + id;
    console.log(detailHouse)
	request(detailHouse, function(error, response, data) {

		data = JSON.parse(data);
		res.locals.data = data;
        console.log(data);
		res.render('details');
	});
});



module.exports = router;
