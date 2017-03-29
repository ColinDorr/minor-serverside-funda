(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var secondScript = require('./secondScript.js');

// variables
var input = document.querySelector('input[name="locatie"]');
var autocomplete_results = document.getElementById("autocomplete-results");
var answers = [];
var answers_return = [];
var results;

console.log("Hello, this is your normal script");

input.setAttribute("autocomplete","off");

// event onkeyup
input.onkeyup = function(e) {
    // jsonp("http://zb.funda.info/frontend/geo/suggest/?query="+input.value +"&max=6&type=koop");
    getJSON("http://zb.funda.info/frontend/geo/suggest/?query="+input.value +"&max=6&type=koop", data => {
        answers = data.Results;
        MakeList(answers)
    })
    function MakeList(answer){
            answers_return = [];
            for (i = 0; i < answers.length; i++) {
                    answers_return.push(answers[i].GeoIdentifier.charAt(0).toUpperCase() + answers[i].GeoIdentifier.slice(1));
          }
          makeComplete(answers_return)
    }
    function makeComplete(){
        if (input.value.length > 0) {
            autocomplete_results.innerHTML = '';
            for (i = 0; i < answers_return.length && i<6; i++) {
                autocomplete_results.innerHTML += '<li class="autoSuggestion">' + (answers_return[i]) + '</li>';
            }
          }
          else {
            autocomplete_results.innerHTML = '';
         }
    }
}

// Get the json data form FUNDA
function getJSON(url, callback) {
    	var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random())
        window[callbackName] = function (data) {
    		delete window[callbackName]
    		document.body.removeChild(script)
    		callback(data)
    	}
    	var script = document.createElement('script')
    	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName
    	document.body.appendChild(script)
    }

// // event on child click
autocomplete_results.onclick = function(e) {
    input.value = e.target.innerHTML;
}

},{"./secondScript.js":2}],2:[function(require,module,exports){
console.log("Hello, this is your browserify");

},{}]},{},[1]);
