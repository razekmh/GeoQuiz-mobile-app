# GeoQuiz mobile app 
This is one of there repositories for a full mobile and web development project. The project was submitted for assessment during UCL masters course and was awarded **distinction**. 


Please check the [README file of the Server Repository](https://github.com/razekmh/GeoQuiz-server/blob/master/README.md) first, Before reading this file.*

## System Requirements:
This application is designed to run both on phones through the PhoneGap application and on PCs through web browsers. Therefore no additional requirements are needed if the ones mentioned in the [server repository](https://github.com/razekmh/GeoQuiz-server) are satisfied 

## Deploying and Testing the code:
Please refer to the [README file of the Server Repository](https://github.com/razekmh/GeoQuiz-server/blob/master/README.md)

## Files in the repository:
The repository contains several files and folders, most of which are created by the phoneGap application automatically. Yet a few files are created or modified by the developer. These files are hosted in the directory `GeoQuiz-mobile-app/ucesmmh/www/`, and the following is a list of these files: 

#### HTML files 
File name | File Role
----------|----------
index | The main application file which contains the basic material design elements, the map and the HTML DIVs which hosts all the items of the application 
help | An identical copy of the HTML code compressed in the [help.js](https://github.com/razekmh/GeoQuiz-web-app/blob/master/ucesmmh/www/js/help.js) file. The purpose of this file is test the help page on the computer before publishing it to the phone.

#### JavaScript files
File name | File Role
----------|----------
allQuestions.js | Send request to the server to get the All questions added by all users and load them to the map.
closestfive.js | Gets the location of the user and then sends a request to the server to get the closest five question and then add them to the map
d3.js | The uncompressed version of d3.js file 
d3.min.js | Minimized version of d3.js
formFunctions.js | Gets the answer submitted by the user and send it to the server to add it to the database and then calls  `noCorrect()` function to (check if the submitted answer is correct or not and provide the user with feedback) 
help.js | Pushes the help file to the html page instead of loading it from another html page, because it doesn't work on the phoneGap. 
incorrectQuestions.js | Send request to the server to get the question points which were not answered correctly by the user and add them to the map
index.js | Added by PhoneGap
lastFive.js | Send request to the server to get the last five answered questions by the user from the database and add them to the map
leaflet.awesome-markers.js | Display awesome markers which are used throughout the application
leaflet.js | Hosts the basic layer display of the map
leafletFunctions.js | Loads the questions to the map and calculate the distance from the user location to the question points 
noCorrect.js | Send a request to the server to get the number of the correct answers and also check the submitted answer for correctness, and provide feedback to the user in the form of an alert
ranking.js | Sends request to the server to get the ranking of the user and then post it in the form of an alert to the user
startup.js | Listen to the page and loads the map once the page is loaded
topFive.js | Sends a request to the server to get the top five scores and display them in a graph
utilities.js | Gets the port number 

#### CSS files 
File name | File Role
----------|----------
graph.css | Adding style to the graph
index.css | Added by phoneGap
ionicons.min.css | Getting Ion Icons
leaflet.awesome-markers.css | Style for the Awesome markers
styles.css | Style for material design 

#### XML files
File name | File Role
----------|----------
config.xml | Handling phoneGap extension  
port.xml | Hosted at `GeoQuiz-mobile-app/ucesmmh/www/res/` to get the port id

## Third Party code:
Source  | Used in 
--------|----------
Web and Mobile Module Practical | All the JS and HTML files
https://jsfiddle.net/8v88gwqn/1/ on 23/03/2019 | Draw the graphs in topFive.js
Material Design | In the index.html 
Leaflet | In All JS files dealing with the map and the index.html file 
