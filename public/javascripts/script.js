
// Source(s)
// https://codepen.io/postleonardo/pen/PwdQmv
console.log("script is running")

// variables
var input = document.querySelector('input[name="locatie"]');
var autocomplete_results = document.getElementById("autocomplete-results");
var answers = ['amsterdam', 'amstelveen', "almere", "beek", "breukelen","dordrecht", "enschede",  "helmond", "leeuwarden",  'limburg', 'purmerend', "rotterdam", 'utrecht', 'volendam', "zoetermeer"];
var results;


// input.attr( 'autocomplete', 'off' );
input.setAttribute("autocomplete","off");
// autocomplete function
function autocomplete(val) {
  var answers_return = [];
  for (i = 0; i < answers.length && i <6 ; i++) {
      if (val === answers[i].slice(0, val.length)) {
          answers_return.push(answers[i].charAt(0).toUpperCase() + answers[i].slice(1));
      }
    }
    return answers_return;
}

// event onkeyup
input.onkeyup = function(e) {
  if (input.value.length > 0) {
    var answers_show = [];
    autocomplete_results.innerHTML = '';
    var answers_show = autocomplete((input.value).toLowerCase());

    for (i = 0; i < answers_show.length && i<7; i++) {
      autocomplete_results.innerHTML += '<li class="autoSuggestion">' + (answers_show[i]) + '</li>';
    }
  }
  else {
    var answers_show = [];
    autocomplete_results.innerHTML = '';
  }
}

// event on child click
autocomplete_results.onclick = function(e) {
    input.value = e.target.innerHTML;
}

// aja()
//     .method('get')
//     .url("http://zb.funda.info/frontend/geo/suggest/?query="+inputfield.value +"&max=7&type=koop&callback=callback")
//     .type('json')
//         .on('200', function(data){
//             console.log("I got data");
//             console.log(data);
//         })
//         .on('40x', function(response){
//             window.location.hash = "/error"
//             console.log("error while getting the data for getData autocomplete (40x)");
//         })
//         .on('500', function(response){
//             window.location.hash = "/error"
//             console.log("error while getting the data for getData autocomplete (500)");
//         })
//     .go();
// }
