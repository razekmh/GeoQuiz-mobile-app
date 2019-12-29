var closestFivelayer
var closestFivejson

//check if the layer is curretly added and remove it if so 
function checkClosestFive(){
    if (mymap.hasLayer(closestFivelayer) && currentLayer == closestFivelayer ){
        mymap.removeLayer(closestFivelayer);
    }
    else {getClosestFive();
    }
}

//remove the current layer of questions before adding the new layer 
function getClosestFive() {
    var closestFiveString = "?longitude="+ userlongitude +"&latitude="+ userlatitude ;
    if (currentLayer) {
        currentLayer.clearLayers();
    };
    processClosestFive(closestFiveString)
    };

var client; // the global variable that holds the request
//sending the request for the cloeset five questions
function processClosestFive(closestFiveString) {
    client = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getClosestFive/"+closestFiveString;
    client.open('GET',url,true);
    //client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = closestFiveUploaded;
    client.send();
}

// create the code to wait for the response from the data server, and process the response once it is received
function closestFiveUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
    // change the DIV to show the response
    closestFivedata= client.responseText;
    loadClosestFive(closestFivedata);
    mapScroll();
    };
}

//load the questions to the map
function loadClosestFive(closestFivedata) {
    // convert the text to JSON
    closestFivejson = JSON.parse(closestFivedata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(closestFivejson,{
        // use point to layer to create the points
        pointToLayer: function (feature, latlng){
            // in this case, we build an HTML DIV string
            // using the values in the data
            //console.log(feature.properties.correct_answer);
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h5>" + feature.properties.question_title + "</h5><br>";
            htmlString = htmlString + "<h6>"+feature.properties.question_text + "</h6><hr>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_1'/>"+ feature.properties.answer_1+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
            htmlString = htmlString + "<button onclick='checkAnswer(" +feature.properties.id + ");return false;'>Submit Answer</button>";
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use feature.properties.correct_answer
            htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" +feature.properties.correct_answer+ "</div>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(htmlString);
            
        },
        

    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds());
    closestFivelayer = currentLayer;
    //console.log(questionsjson);
};