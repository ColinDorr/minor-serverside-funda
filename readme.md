# Minor WebDev | ServerSide-Funda
This is a ServerSide version of the funda web application enchanced, with javsascript enhancements.

The gets to see a list with different houses. If the user would like to search for a house, he/she could type in a name and press search and the results will be showed.

The javascript enhancements turn off the systam Autosuggestions and uses my own autosuggestion. This way, the user gets to see possible suggestions, while he/she is typing in the search bar. If the user clicks on one of the suggestions. The answer will be placed in the input field and will be ready to search.

`
V 1.0.7
`
## Installing
### Stap 1: Cloning
```
$ git clone https://github.com/ColinDorr/minor-serverside-funda.git
```

### Stap 2: Preparing
- Create a .env file in the minor-serverside-funda folder (same level as the package.json)

- Fill `.env` with Funda json url and the Funda key. For exmaple:
```
URL=http://funda.kyrandia.nl/feeds/Aanbod.svc/json/
API_KEY=1234ThisWillBeTheFundaKey
```
- After creating the .env file and giving it the correct values, oyu are ready to run the application.

### Stap 3: Running
- Go the console and find the minor-serverside-funda folder.
- In the minor-serverside-funda folder use ``npm install`` to install the necessary node modules.
- Afterwards use ``npm start``, to start the application. The applications is now running on your local host on http://localhost:3000/ .

#### Localhost
- To install the node modules
```
$ npm install
$ npm start
```
It should return something like this:
```
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
started on port 3000!
```

-   If `npm start` throws an `error` please check if port `3000` is free.

#### Online exposure
if you want to test it online. You can use the expose function.
- Open a extra console and find the minor-serverside-funda folder.
- Do ``npm run expose``, to expose it to internet.
```
$ npm run expose
```
you will get something like this:
```
Session Status                online
Version                       2.1.18
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://897dd0cb.ngrok.io -> localhost:3000
Forwarding                    https://897dd0cb.ngrok.io -> localhost:3000
```

- If you now go to the weird https://897dd0cb.ngrok.io type of linke. you will find your live sersion.


### Features
- User can search on location.
- User gets to see a sugestion of possible locations (work in progress).
- User can search on distance form location
- User can search with a min and max price
- User can see houses in a list.
- User gets to see suggested houses, that did almost fit his or here search query. (suggestions)
- Works offline with ServiceWorker.
- Works without JavaScript.


### Usage
The user wants to look for a house. With all the filters and features, the user can easally search through all the houses. At the same time, the app will look for houses, that liks for a house and while doing so, he/she will get suggestions for houses, that did almost fit his or here search query. This way, the user might find a house, that she normally would not have found.

### Directories
- bin
    -www
- node_modules
- public
    - images
    - Javascript
    - stylesheets
- routes
- views

## Accessibility
### Color
#### Normal
![color](./screenshots/color2.JPG)
The colors, that I have used in my design are:
- Header: ``##f7a100``,
- Background: ``#e7f1f5``
- Buttons: ``#0071b``.

I chose these colors, because they match the colerschema of the Funda website and because they work wel together. Only the white on the orange is a bit tricky for people with bad eyesight, but this was Funda's style and that's why I did not change it.

(If I would change it, I would make the orange buttons a bit darker and make the white letters font-weigth bigger. ") and the website have a consistent thema in common.

#### Black and white
![black-white](./screenshots/black-white2.JPG)

#### partial blindness
![Blind](./screenshots/blind.JPG)


### Tab-navigation
Nowadays a website should be accessable, for everyone. That's why the site should also be able to bu used without a mouse or touchpad.

Thats why I build my web application, so that users could use the tab, to navigate through the side. In the picture above, you can see the path, the user takes by using the tab to navigate. And the navigation is logical an easy to use.

![Tab-navigation](./screenshots/tab-pattern.JPG)

Possible inprovements:
- [ ] Make link text better, by adding more explaining data, without getting to long (is now adres, could be better).

### Screanreader
![Tab-navigation](./screenshots/chromevox.JPG)
I also used the 'ChromeVox' screanreader extension in Chrome, to check if my web applications was also accessable for people, who are partial or completely blind.

The results from the screanreader where pretty good, if I say so myself. Everything was read and was clear to understand.

#### Javascript
Because most of the functions of the web application are getting renderd on the server. You could turn off the javsascript and everything would still work. The user would still get to see the list with links and he/she could still search..

The only difference between the site with and without javascript is, that without javascript, the custom autocomplete will not get displayed. But the system autocomplete (previous searched items) will get displayed.

###### Javascript Autocomplete
When the javascript gets succesvolly loaded. Hide the autocomplete.
// if the javascript works. Turn off the autocomplete.
// else, the javascript does not load and the fallback is the normal  system autocomplete.

PS. The autocomplete attribute does not exist in IE8 and lower. Because of this the javascript will not work and the user will have no custom autosuggest.

![autofill-with-js](./screenshots/autofill-without-js.JPG)
```
// turn off the autocomplete on the search input field
input.setAttribute("autocomplete","off");


// If the user types something, this function checks the users input and makes a custom autocomplete for him/her.

input.addEventListener("keyup", startAutoSuggest);
    function startAutoSuggest(e) {
      if (input.value.length > 0) {
          var val =input.value.toLowerCase()
          document.getElementById("autocomplete-results").style.display = 'block';
          autocomplete_results.innerHTML = '';
          autocompleteList(val);
        }
        else{
            document.getElementById("autocomplete-results").style.display = 'none';
            autocomplete_results.innerHTML = '';
        }
      }
............

```
![autofill-without-js](./screenshots/autofill-with-js.jpg)

Possible inprovements:
- [ ] Make the autocompletes tabable. Now they are just list items.


Below I have place some screenshots of the different stages of IE8 , IE9 , IE10 and IE11, because if it works there it will work almost everywhere.
![Tab-navigation](./screenshots/ie8-9-10-11.JPG)

## Funda
#### The Funda app
![homescreen](./screenshots/homescreen.jpg)

#### Funda speed insight
PageSpeed Insights desktop:
![desktop-support](./screenshots/desktop-support.JPG)

PageSpeed Insights mobile:
![mobile-support](./screenshots/mobile-support.JPG)


## Photo's DeviceLab
##### All screens
<!-- ![DeviceLab foto3](./screenshots/foto3.jpg) -->

##### Big tablet landscape
<!-- ![DeviceLab foto1](./screenshots/foto1.jpg)
![DeviceLab foto2](./screenshots/foto2.jpg) -->

##### Normal tablet portrait
<!-- ![DeviceLab foto5](./screenshots/foto5.jpg)
![DeviceLab foto6](./screenshots/foto6.jpg)
![DeviceLab foto7](./screenshots/foto7.jpg) -->

##### Mobile portrait
<!-- ![DeviceLab foto5](./screenshots/foto4.jpg) -->

## Loading speed
 | Throttling      |  Requests   | Transferred     | DOMContentLoaded  | Load          | Finished      |
 | :-------------  | :---------    | :-------------   | :----------                |  :---------- | :---------- |
 | '   GPRS  '      | '  9   '         | ' 233kb    '     | '   3.77s  '              | '   39.18s  '  |  '   39.88s  '|
 | '   2G  '           | '  9   '          | ' 233kb    '| '  1.62s  '                | '   8.57s  '|  '   8.94s  '|
 | '   3G  '           | '  9   '          | ' 233kb    '| '  1.64s  '                | '   3.40s  '|  '   3.73s  '|
 | '   4G  '           | '  9   '          | ' 233kb    '| '  1.87s  '                | '   1.90s  '|  '   2.40s  '|
 | '   Wifi  '         | '  9   '          | ' 233kb   '| '   1.88s  '               | '   1.89s  '|  '   2.43s  '|
 | '   No throttling  '| '  9   '      | ' 233kb    '| '   1.47s '                | '   1.48s  '| '   2.08s '|


 ## Wishlist/ To do
 - [x] Autosuggestion api
 - [ ] Improve Performace
     - [ ]Img compression.

     - [x] Minimize content.
     - [x]Responsive picture element.
     - [x]Critical css.
     - [x]Gzip conpression.
    
- Make the autocompletes tabable. Now they are just list items.

 Optional:
 - [ ] Google map api
 - Make link text better, by adding more explaining data, without getting to long (is now adres, could be better).

 ### Sources:
 - https://github.com/wooorm/dictionary
 - https://expressjs.com/en/starter/generator.html
 - https://www.npmjs.com/package/dotenv
 - https://www.npmjs.com/package/request
 - https://codepen.io/postleonardo/pen/PwdQmv
 - https://github.com/TimoVerkroost/minor-performance-matters-funda
