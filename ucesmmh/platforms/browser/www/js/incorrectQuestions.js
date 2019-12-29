//send request to the server to get the the incorrect questions 
function getincorrectQuestions() {
    //checks if there's alayer currently loaded and remove it if so 
    if (currentLayer) {
        currentLayer.clearLayers();
    };
    incorrectQuestionsClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getInccorectQuizPoints/" + httpPortNumber;
    incorrectQuestionsClient.open('GET',url,true);
    incorrectQuestionsClient.onreadystatechange = incorrectQuestionsResponse; // note don't use questionsResponse() with brackets as that doesn't work
    incorrectQuestionsClient.send();
};
    

// create the code to wait for the response from the data server, and process the response once it is received
function incorrectQuestionsResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (incorrectQuestionsClient.readyState == 4) {
    // once the data is ready, process the data
    var incorrectQuestionsdata = incorrectQuestionsClient.responseText;
    loadincorrectQuestions(incorrectQuestionsdata);
    mapScroll();
    }
};
//load the response to the map 
function loadincorrectQuestions(incorrectQuestionsdata) {
    // convert the text to JSON
    incorrectQuestionsjson = JSON.parse(incorrectQuestionsdata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(incorrectQuestionsjson,{
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
            currentLayer = questionslayer;
            return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(htmlString);
        },   
    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds());
};
