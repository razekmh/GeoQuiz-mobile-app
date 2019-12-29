//The code is adopted from the web and mobile module practicals
//the following function loads the points to the map
var questionsjson;
var questionslayer;
var userMarker;
var markerid;
var userlongitude;
var userlatitude;
var currentQuestionID;
var currentLayer;
function loadquestions() {
    
    // keep the alert message so that we know something is happening
    getQuestions()
};

function getQuestions() {
    if (currentLayer) {
        currentLayer.clearLayers();
    };
    myQuestionsClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getQuizPoints/"+ httpPortNumber;
    myQuestionsClient.open('GET',url,true);
    myQuestionsClient.onreadystatechange = questionsResponse; // note don't use questionsResponse() with brackets as that doesn't work
    myQuestionsClient.send();
};
    

// create the code to wait for the response from the data server, and process the response once it is received
function questionsResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (myQuestionsClient.readyState == 4) {
    // once the data is ready, process the data
    var questionsdata = myQuestionsClient.responseText;
    loadQuestions(questionsdata);
    mapScroll();
    }
};

function loadQuestions(questionsdata) {
    // convert the text to JSON
    questionsjson = JSON.parse(questionsdata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(questionsjson,{
        // use point to layer to create the points
        pointToLayer: function (feature, latlng){
            // in this case, we build an HTML DIV string
            // using the values in the data
            
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h5>" + feature.properties.question_title + "</h5><br>";
            htmlString = htmlString + "<h6>"+feature.properties.question_text + "</h6><hr>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_1'/>"+ feature.properties.answer_1+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
            htmlString = htmlString + "<button onclick='checkAnswer(" +feature.properties.id + ");return false;'>Submit Answer</button>";
            //currentQuestionID = feature.properties.id
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use feature.properties.correct_answer
            htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" +feature.properties.correct_answer+ "</div>";
            htmlString = htmlString + "</div>";
            currentLayer = questionslayer;
            return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(htmlString);
            
        },
        

    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds());
};

function checkAnswer(questionID) {
    currentQuestionID = questionID;
    // console.log("currentQuestionID = " +  currentQuestionID)
    currentLayer.eachLayer(function(layer) {
        if (layer.feature.properties.id == currentQuestionID) {
            // console.log("layer._leaflet_id = " + layer._leaflet_id);
            markerid = layer._leaflet_id;
            // console.log("marker ID = " + markerid);
        };
    });
    // get the answer from the hidden div
    // NB - this is done BEFORE closing the pop-up as when we close the pop-up the DIV is destroyed
    var answer = document.getElementById("answer"+currentQuestionID).innerHTML;
    var answerSelected = 0;
    for (var i=1; i < 5; i++) {
        if (document.getElementById(currentQuestionID+"_"+i).checked){ 
            answerSelected = i;
            startAnswerUpload(currentQuestionID,answerSelected,answer)
        };};
        if (answerSelected == 0 ) {alert("please select an answer")};
    };

//adding the points  to the map 
function addpoint (position) {
    userlongitude = position.coords.longitude
    userlatitude = position.coords.latitude
    if (userMarker){
        mymap.removeLayer(userMarker);
        }
    userMarker = L.marker([userlatitude, userlongitude]).addTo(mymap);
    //document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    closestFormPoint(position);
    };

function trackLocation() {
        //console.log("trackactivated")
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(addpoint);
		} 
		else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
		}
    };
    
 
function closestFormPoint(position) {
            // take the leaflet formdata layer
            // go through each point one by one
            // and measure the distance to Warren Street
            // for the closest point show the pop up of that point
            var minDistance = .1;
            var closestFormPoint = 0;
            var userlat = position.coords.latitude;
            var userlng = position.coords.longitude;
            currentLayer.eachLayer(function(layer) {
                var distance = calculateDistance(userlat, userlng,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
                if (distance < minDistance){
                    minDistance = distance;
                    //console.log(minDistance);
                    closestFormPoint = layer.feature.properties.id;
                    }
            });
            // for this to be a proximity alert, the minDistance must be
            // closer than a given distance - you can check that here
            // using an if statement
            // show the popup for the closest point
            currentLayer.eachLayer(function(layer) {
                if (layer.feature.properties.id == closestFormPoint){
                layer.openPopup();
            }
            });
};

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
    // where radius of the earth is 3956 miles
    if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
    if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
    return dist;
    };

var testMarkerRed = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'red'
        });
var testMarkerBlue = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'blue'
        });
var testMarkerGreen = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'green'
        });

function changeMarkerColor (markerid, color) { 
    currentLayer.getLayer(markerid).setIcon(color);    
};

//scroll to the map 
function mapScroll() {
    document.getElementById("mapid").scrollIntoView();
};