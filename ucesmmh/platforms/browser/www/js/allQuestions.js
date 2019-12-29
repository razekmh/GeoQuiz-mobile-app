// send request to the server to recive all the questions added by all users 
function getAllQuestions() {
    if (currentLayer) {
        currentLayer.clearLayers();
    };
    allQuestionsClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getAllQuizPoints/";
    allQuestionsClient.open('GET',url,true);
    allQuestionsClient.onreadystatechange = allQuestionsResponse; // note don't use questionsResponse() with brackets as that doesn't work
    allQuestionsClient.send();
};
    

//Wait for the response from the data server, and process the response once it is received
function allQuestionsResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (allQuestionsClient.readyState == 4) {
    // once the data is ready, process the data
    var allQuestionsdata = allQuestionsClient.responseText;
    loadAllQuestions(allQuestionsdata);
    mapScroll();
    }
};

//load the questions to the map
function loadAllQuestions(allQuestionsdata) {
    // convert the text to JSON
    allQuestionsjson = JSON.parse(allQuestionsdata);
    // add the JSON layer onto the map - it will appear using the default icons
    currentLayer = L.geoJson(allQuestionsjson,{
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
            htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" +feature.properties.correct_answer+ "</div>";
            htmlString = htmlString + "</div>";
            currentLayer = questionslayer;
            return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(htmlString);
            
        },
        

    }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(currentLayer.getBounds());
};
