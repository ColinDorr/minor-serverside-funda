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
            document.querySelector(".autoSuggestions").style.display = 'block';
          }
          else {
            autocomplete_results.innerHTML = '';
            document.querySelector(".autoSuggestions").style.display = 'none';
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

if (navigator.onLine !== true) {
      var images = document.querySelectorAll('picture  img'), i;

      for (i = 0; i < images.length; ++i) {
        images[i].setAttribute("src", "images/dummy-image.jpg");
      }
    }
