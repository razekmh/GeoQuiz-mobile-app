//The code is adopted from the web and mobile module practicals
var lastFivejson
var lastFiveClient; // the global variable that holds the request
function getlastFive() {
    currentLayer.clearLayers(); 
    lastFiveClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getLastFive/"+ httpPortNumber;
    lastFiveClient.open('GET',url,true);
    //lastFiveClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    lastFiveClient.onreadystatechange = lastFiveUploaded;
    lastFiveClient.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function lastFiveUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (lastFiveClient.readyState == 4) {
    // change the DIV to show the response
    lastFivedata= lastFiveClient.responseText;
    loadlastFive(lastFivedata);
    mapScroll();
    }
}

function loadlastFive(lastFivedata) {
    // convert the text to JSON
    lastFivejson = JSON.parse(lastFivedata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(lastFivejson,{
        // use point to layer to create the points
        pointToLayer: function (feature, latlng){
            // using the values in the data
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
            if (feature.properties.answer_correct){
                return L.marker(latlng, {icon:testMarkerGreen}).bindPopup(htmlString);
            }
            else{
                return L.marker(latlng, {icon:testMarkerRed}).bindPopup(htmlString);
            };
            
        },
        

    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds())};
