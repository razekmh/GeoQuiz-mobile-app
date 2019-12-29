// the reason for this function to operate in the presented way is to allow for the database to record submited answer and inculde it in calculating the number of correctly answered questions 
var noCorrectClient; 
var numberOfQuestions;
//send request to the server to get number of correctly answered questions 
function noCorrect() {
    noCorrectClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/noCorrect/"+ httpPortNumber;
    noCorrectClient.open('GET',url,true);
    noCorrectClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    noCorrectClient.onreadystatechange = noCorrectUploaded;
    noCorrectClient.send();
};

//once the response has been delivered the function checks the submited answer and combine the result with the number of correct questions so far, inculding the current question 
function noCorrectUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (noCorrectClient.readyState == 4) {
    noCorrectdata = noCorrectClient.responseText;
    numberOfQuestions = JSON.parse(noCorrectdata)[0].array_to_json[0].num_questions;
    var correctAnswer = false;
    if (currentQuestionID) {
        var answer = document.getElementById("answer" + currentQuestionID).textContent;
        console.log("correct answer" + answer);
        for (var i=1; i < 5; i++) {
            if ((document.getElementById(currentQuestionID+"_"+i).checked) && (i == answer)) {
                alert ("Well done, so far you have answered " +numberOfQuestions+ " correctly");
                correctAnswer = true;
                changeMarkerColor (markerid,testMarkerGreen);
                }
            };
        if (correctAnswer === false) {
        changeMarkerColor (markerid,testMarkerRed);
        // they didn't get it right
        alert("Better luck next time, so far you have answered " +numberOfQuestions+ " correctly. The correct answer is choice number " + answer );
        }
        // now close the popup
        mymap.closePopup();
        currentQuestionID = null;
    }
    //in case the function has been called by clicking the menu option and not through answering a question 
    else {
        alert("You have answered " +numberOfQuestions+ " questions correctly so far") 
    };
    }}
    ;