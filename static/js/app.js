/***
* App.js
*   Author: C.L. Dörr <info@cdmediadesign.nl>
*/

(function () {
    "use strict";
    var userChoiceData ={   //Object containing data needed for the Funda data retriefing api
        dataUrl : "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/",
        apikey:  config.API_KEY + "/",
        huurOfKoop : "?type=koop&zo=/",
        locatie : "heel-nederland/",
        afstand : 0,
        extraAfstand:0,
        prijsMin : 0,
        prijsMax :2147483647,//is the maximum price of a house;
        paginaRequestedData : 1,
        paginaExtraData : 1,
        pageSize : "&pagesize=25",
    };
    console.log(userChoiceData.dataUrl + userChoiceData.apikey);
    userChoiceData.dataUrl =userChoiceData.dataUrl + userChoiceData.apikey


    var homeData ={ //Object, that contains all the collected data from the Funda api.
        requestedData : [],
        extraData : [],
        showRequested : true,
        showExtra : true,
    };
    var app ={  // When the app is started, start the routes.getLocation() and the dataCollection.getHomePageData() functions.
        init : function(){
            routes.getLocation();
            dataCollection.getHomePageData();
            }
    };
    // This object contains functions, that make the routes/navigation between different sections possible.
            var   routes = {
                    getLocation: function(){   // This function gets the current location and sends it to the sections.toggle() function.
                        routie('#landing');
                        routie({
                            'landing': function() {
                                sections.toggle("landing");
                            },
                            'home': function() {
                                sections.toggle("home");
                            },
                            'searchResults': function(){
                                sections.toggle("searchResults");
                            },
                            'suggestions': function() {
                                sections.toggle("suggestions")
                            },
                            'map': function(){
                                sections.toggle("map");
                                Map.initMap();
                            },
                        });
                    },
                }
                var sections ={// object containing al the functions related to hiding or showing specific pages.
                    sectionElements : [ // Object containing all the specila pages/items
                        document.querySelector('#home'),
                        document.querySelector('.CoverImage') ,
                        document.querySelector('.gebruikersInput'),
                        document.querySelector('.displayType'),
                        document.querySelector('#searchResults'),
                        document.querySelector('#suggestions'),
                        document.querySelector('#map'),
                        document.querySelector('#error'),
                    ],

                    toggle : function(page){ // This function gets all the important sections in the DOM and depending on the window hash, displays or hides different sections.

                        var navigationElements = document.querySelectorAll('.displayType ul li');
                        sections.sectionElements.forEach(function(el){
                            el.classList.remove('active');
                            el.hidden = true;
                        });
                        navigationElements.forEach(function(el){
                            el.classList.remove('active');
                        });

                        switch(page) {
                            case "landing":
                                navigationElements[0].classList.add("active")
                                sections.sectionElements[0].hidden = false;
                                sections.sectionElements[1].hidden = false;
                                sections.sectionElements[2].hidden = false;
                                sections.hideLoader();
                                break;
                            case "home":
                                navigationElements[0].classList.add("active")
                                sections.sectionElements[0].hidden = false;
                                sections.sectionElements[2].hidden = false;
                                sections.sectionElements[3].hidden = false;
                                break;
                            case "searchResults":
                                navigationElements[1].classList.add("active")
                                sections.sectionElements[2].hidden = false;
                                sections.sectionElements[3].hidden = false;
                                sections.sectionElements[4].hidden = false;
                                break;
                            case "suggestions":
                                navigationElements[2].classList.add("active")
                                sections.sectionElements[2].hidden = false;
                                sections.sectionElements[3].hidden = false;
                                sections.sectionElements[5].hidden = false;
                                break;
                            case "map":
                                navigationElements[3].classList.add("active")
                                sections.sectionElements[2].hidden = false;
                                sections.sectionElements[3].hidden = false;
                                sections.sectionElements[6].hidden = false;
                                break;
                            default:
                                sections.sectionElements[7].hidden = false;
                        }
                        userInput.getUserInput();
                    },
                    showLoader : function(){    //This function shows the loader
                        document.querySelector('.loader').hidden = false;
                    },
                    hideLoader : function(){    //This function hides the loader
                        document.querySelector('.loader').hidden = true;
                    },

                };


    var userInput = { //Object, that contains functions related to the retrieval of the user input
        getUserInput: function(){
            var zoekButton = document.querySelector('.sendAnswers');
           zoekButton.onclick = function() {

               window.location.hash="#searchResults"

               reset.resetValues();
               sections.showLoader();

                var elements ={
                   huurOfKoop : document.querySelector('input[name="huurOfKoopSelectie"]:checked').value,
                   locatie : document.querySelector('input[type="text"][name="locatie"]').value,
                   afstand :document.querySelector('select[id="afstand"]').value,
                   prijsMin:document.querySelector('input[type="number"][name="prijsMin"]').value,
                   prijsMax:document.querySelector('input[type="number"][name="prijsMax"]').value,
                }

                if(elements.huurOfKoop==""){userChoiceData.huurOfKoop = "?type=koop&zo=/"}
                else{userChoiceData. huurOfKoop = elements.huurOfKoop}
                if(elements.locatie==""){userChoiceData.locatie="heel-nederland/"}
                else{userChoiceData.locatie=elements.locatie+"/"}

                if(elements.afstand=="0"){userChoiceData.afstand =0; userChoiceData.extraAfstand=Number(elements.afstand)+3;}
                else{userChoiceData.afstand=elements.afstand
                    userChoiceData.extraAfstand=Number(elements.afstand)+3
                    userChoiceData.afstand="+"+userChoiceData.afstand+"km/"}

                if(elements.prijsMin=="" || elements.prijsMin < 0 || elements.prijsMin >2147483647){
                    userChoiceData.prijsMin =0}
                else{userChoiceData.prijsMin=elements.prijsMin}

                if(elements.prijsMax=="" || elements.prijsMax  >2147483647){userChoiceData.prijsMax=2147483647}
                else{userChoiceData.prijsMax=elements.prijsMax}
                dataCollection.getRequestedData();
            }
        },
    };

    var dataCollection = { //Object, that contains functions related to retriefing data
        getHomePageData : function(){ //function for retriefing getHomePageData
                aja()
                    .method('get')
                    .url(userChoiceData.dataUrl+userChoiceData.huurOfKoop+userChoiceData.locatie+userChoiceData.afstand+userChoiceData.prijsMin+"+"+userChoiceData.prijsMax+"/&page="+userChoiceData.paginaRequestedData+"&pagesize=3")
                    .type('json')
                    .on('200', function(data){
                        homeData.requestedData= data.Objects;
                        render.renderHomePageData(data.Objects);
                    })
                        .on('40x', function(response){
                            window.location.hash = "#error"
                            console.log("error while getting the data for getHomePageData (40x)");
                        })
                        .on('500', function(response){
                            window.location.hash = "#error"
                            console.log("error while getting the data for getHomePageData (500)");
                          })
                    .go();
                },
        getRequestedData : function(){  //function for retriefing getRequestedData
            aja()
                .method('get')
                .url(userChoiceData.dataUrl+userChoiceData.huurOfKoop+userChoiceData.locatie+userChoiceData.afstand+userChoiceData.prijsMin+"+"+userChoiceData.prijsMax+"/&page="+userChoiceData.paginaRequestedData+userChoiceData.pageSize)
                .type('json')
                .on('200', function(data){
                    homeData.requestedData = data.Objects
                    dataCollection.getExtraData();
                })
                    .on('40x', function(response){
                        window.location.hash = "#error"
                        console.log("error while getting the data for getRequestedData (40x)");
                    })
                    .on('500', function(response){
                        window.location.hash = "#error"
                        console.log("error while getting the data for getRequestedData (500)");
                      })
                .go();
            },
            getExtraData : function(){  //function for retriefing getExtraData
                aja()
                    .method('get')
                    .url(userChoiceData.dataUrl+userChoiceData.huurOfKoop+userChoiceData.locatie+"+"+userChoiceData.extraAfstand+"km/"+userChoiceData.prijsMin+"+"+userChoiceData.prijsMax+"/&page="+userChoiceData.paginaExtraData+userChoiceData.pageSize)
                    .type('json')
                    .on('200', function(data){
                        dataCollection.getFilteredData(data.Objects)
                    })
                        .on('40x', function(response){
                            window.location.hash = "#error"
                            console.log("error while getting the data for getExtraData (40x)");
                        })
                        .on('500', function(response){
                            window.location.hash = "#error"
                            console.log("error while getting the data for getExtraData (500)");
                          })
                    .go();
            },
            getFilteredData : function(data){ // function, that filters the ExtraData, so only city', that are not the same as the User input location remain.
                if (userChoiceData.locatie != "heel-nederland/" && homeData.extraData.length <10){
                    var filtered = data.filter(function (el) {
                        return el.Woonplaats.toUpperCase()+"/" != userChoiceData.locatie.toUpperCase()
                    });
                    filtered.forEach(function(el){
                        homeData.extraData.push(el)
                    });
                    userChoiceData.paginaExtraData++
                    dataCollection.getExtraData();
                    render.renderRequestedData(homeData.requestedData);
                    render.renderExtraData(homeData.extraData);
                }

                else if(homeData.extraData.length >= 10){
                    homeData.extraData = homeData.extraData.slice(0, 10);
                    render.renderRequestedData(homeData.requestedData);
                    render.renderExtraData(homeData.extraData);

                }
                else{
                    render.renderRequestedData(homeData.requestedData);
                    render.renderExtraData(homeData.extraData);
                }
                window.location.hash="#searchResults"

                setTimeout(function(){
                    sections.hideLoader();
                }, 1500);



        },
    };
    var render ={ //Object, that contains functions for rendering the data to the DOM
        renderHomePageData: function(data, directives){ // This functions renders the renderHomePageData data to the DOM
       directives = {
               adres: {
                 text: function(params) {
                   return params.value + this.Adres;
                 }
               },
             postWoon: {
               text: function(params) {
                 return params.value + this.Postcode + " " + this.Woonplaats;
               }
             },
             imageSrc: {
                src: function(params) {
                  return this.FotoLarge;
                }
            },
            Koopprijs: {
              text: function(params) {
                  if (userChoiceData.huurOfKoop =="?type=koop&zo=/"){return params.value + this.Koopprijs +" k.k";}
                  else if (userChoiceData.huurOfKoop =="?type=huur&zo=/"){return params.value + this.Huurprijs +" k.k";}
                  else{return params.value +"Van "+ this.Koopprijs +" tot "+ this.KoopprijsTot + " v.o.n.";}
                return params.value + this.Koopprijs +" k.k";
              }
            },
             link: {
                href: function(params) {
                  return this.URL;
                }
            }
           };
            Transparency.render(document.querySelector('.homeData'), data, directives);
        },


        renderRequestedData: function(data, directives){ // This functions renders the renderRequestedData data to the DOM
       directives = {
               AangebodenSindsTekst: {
                 innerHTML: function(params) {
                   return params.value + this.AangebodenSindsTekst;
                 }
               },
               adres: {
                 text: function(params) {
                   return params.value + this.Adres;
                 }
               },
             postWoon: {
               text: function(params) {
                 return params.value + this.Postcode + " " + this.Woonplaats;
               }
             },
             imageSrc: {
                src: function(params) {
                  return this.FotoLarge;
                }
            },
            woonoppervlakte: {
              text: function(params) {
                return params.value + this.Woonoppervlakte + " m2";
              }
            },
            AantalKamers: {
              text: function(params) {
                return params.value + this.AantalKamers;
              }
            },
            Koopprijs: {
              text: function(params) {
                  if (userChoiceData.huurOfKoop =="?type=koop&zo=/"){return params.value + this.Koopprijs +" k.k";}
                  else if (userChoiceData.huurOfKoop =="?type=huur&zo=/"){return params.value + this.Huurprijs +" k.k";}
                  else{return params.value +"Van "+ this.Koopprijs +" tot "+ this.KoopprijsTot + " v.o.n.";}
                return params.value + this.Koopprijs +" k.k";
              }
            },
            MakelaarNaam: {
              text: function(params) {
                return params.value + this.MakelaarNaam;
              }
            },
             link: {
                href: function(params) {
                  return this.URL;
                }
            }
           };
            Transparency.render(document.querySelector('.requestedData '), data, directives);
        },
        renderExtraData: function(data, directives){ // This functions renders the renderExtraData data to the DOM
       directives = {
               AangebodenSindsTekst: {
                 innerHTML: function(params) {
                   return params.value + this.AangebodenSindsTekst;
                 }
               },
               adres: {
                 text: function(params) {
                   return params.value + this.Adres;
                 }
               },
             postWoon: {
               text: function(params) {
                 return params.value + this.Postcode + " " + this.Woonplaats;
               }
             },
             imageSrc: {
                src: function(params) {
                  return this.FotoLarge;
                }
            },
            woonoppervlakte: {
              text: function(params) {
                return params.value + this.Woonoppervlakte + " m2";
              }
            },
            AantalKamers: {
              text: function(params) {
                return params.value + this.AantalKamers;
              }
            },
            Koopprijs: {
              text: function(params) {
                  if (userChoiceData.huurOfKoop =="?type=koop&zo=/"){return params.value + this.Koopprijs +" k.k";}
                  else if (userChoiceData.huurOfKoop =="?type=huur&zo=/"){return params.value + this.Huurprijs +" k.k";}
                  else{return params.value +"Van "+ this.Koopprijs +" tot "+ this.KoopprijsTot + " v.o.n.";}
                return params.value + this.Koopprijs +" k.k";
              }
            },
            MakelaarNaam: {
              text: function(params) {
                return params.value + this.MakelaarNaam;
              }
            },
             link: {
                href: function(params) {
                  return this.URL;
                }
            }
           };
            Transparency.render(document.querySelector('.extraData '), data, directives);
        },
    }

    var Map ={ //Object, that contains all the functions of the generation of a google map (API)
        initMap: function() {   // gets the lat and lng of the requestedLocations, extraLocations
                var requestedLocations =[];
                    homeData.requestedData.forEach(function(el){
                        requestedLocations.push( {['Woonplaats']:el.Woonplaats,['link']:el.URL, ['lat']:el.WGS84_Y ,['lng']:el.WGS84_X})
                    });

                if (homeData.extraData.length != 0){
                    var extraLocations =[];
                    homeData.extraData.forEach(function(el){
                        extraLocations.push( {['Woonplaats']:el.Woonplaats,['link']:el.URL, ['lat']:el.WGS84_Y, ['lng']:el.WGS84_X})
                    });
                }

                Map.makeMap(requestedLocations, extraLocations);
            },

        makeMap : function(requestedLocations, extraLocations){ // Make the map and choose zoomlevel/center
            if (userChoiceData.locatie == "heel-nederland/"){
                var map = new google.maps.Map(document.querySelector('.map'), {
                  zoom: 8,
                  center: requestedLocations[0]
                });
            }
            else {
                var map = new google.maps.Map(document.querySelector('.map'), {
                  zoom: 11,
                  center: requestedLocations[0]
                });
            }
            if (homeData.requestedData.length >0 && homeData.showRequested == true){
                Map.makeRequestedMarkers(map, requestedLocations);
            }
            if (homeData.extraData.length >0 && homeData.showExtra == true){
                Map.makeExtraMarkers(map, extraLocations);
            }
        },
       makeRequestedMarkers: function(map, requestedLocations, extraLocations){ // Make the markers for the map.
           var marker, i;
            for (i = 0; i < requestedLocations.length; i++) {
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(requestedLocations[i].lat, requestedLocations[i].lng),
                map: map,
                icon: './static/img/marker-green.png',
                url: requestedLocations[i].link
              });

             google.maps.event.addListener(marker, 'click', function() {
                 console.log(this.url);
                 window.location.href = this.url;
             });
        }
    },
    makeExtraMarkers: function(map, extraLocations){ // Make the markers for the map.
        var marker, x;
                for (x = 0; x < extraLocations.length; x++) {
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(extraLocations[x].lat, extraLocations[x].lng),
                    map: map,
                    icon: './static/img/marker-red.png',
                    url: extraLocations[x].link
                  });
              }

          google.maps.event.addListener(marker, 'click', function() {
              console.log(this.url);
              window.location.href = this.url;
          });
     }
 };


    var reset= {    // Reset the collected data to blank, so the user can get new data.
        resetValues: function(){
            homeData.requestedData=[];
            homeData.extraData =[];
        }
    }


// Start the app by, starting the app.init(); function.
    app.init();
})();
