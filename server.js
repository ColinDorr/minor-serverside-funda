'use strict';

var path = require('path');
var url = require('url');
var https = require('https');
var express = require('express');
var handlebars = require('handlebars');
var compression = require('compression');
var dotenv = require('dotenv');

dotenv.config();

var key = process.env.API_KEY;

if (!key) {
  throw new Error('Missing `API_KEY` in env.');
}
console.log("help me i'm the server.js")

var endpoint = 'https://wordsapiv1.p.mashape.com';
var headers = {Accept: 'application/json', 'X-Mashape-Key': key};

express()
  .use(compression())
  .use('/static', express.static('public', {maxAge: '31d'}))
  .use('/worker.js', worker)
  .get('/api/:word', word)
  .get('/', home)
  .get('/:word', entry)
  .listen(2000);

function word(req, res) {
  load(req.params.word, callback);

  function callback(err, buf) {
    if (err) {
      res.emit('error', err);
    } else {
      res.set('Content-Type', 'application/json');
      res.end(String(buf));
    }
  }
}

function entry(req, res) {
  var val = decodeURIComponent(req.params.word);

  load(val, callback);

  function callback(err, buf) {
    respond(res, err, buf ? JSON.parse(buf) : {word: val, found: false});
  }
}

function home(req, res) {
  if (req.query.word) {
    res.redirect('/' + req.query.word);
  } else {
    respond(res);
  }
}

function respond(res, err, data) {}

function load(value, callback) {
  var word = String(value).toLowerCase();

  db.get(word, local);

  function local(_, buf) {
    if (buf) {
      callback(null, buf);
    } else {
      console.log('Could not find `%s` in database', word);
      https.get(xtend(url.parse(endpoint + '/words/' + word), {headers: headers}), onresponse);
    }
  }

  function onresponse(response) {
    response.on('error', callback).pipe(concat(onconcat));

    function onconcat(buf) {
      if (response.statusCode !== 200) {
        console.log('Could not find `%s` on remote', word);
        buf = JSON.stringify({word: word, found: false});
      }

      db.put(word, buf, ondone);

      function ondone() {
        callback(null, buf);
      }
    }
  }
}
