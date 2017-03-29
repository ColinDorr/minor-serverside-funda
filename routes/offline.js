var express = require('express');
var router = express.Router();

var pageOptions =
    {
        title: "Funda paage is offline",
        content: "Er is helaas iets mis gegaan, waardoor wij uw verzoek niet konden afhandelen."
    };

router.get('/', function(req, res) {
    res.render('offline', pageOptions);
});

module.exports = router;
