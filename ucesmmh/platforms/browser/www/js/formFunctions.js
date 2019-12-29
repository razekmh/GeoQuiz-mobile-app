//prepare the htmlstring for the server request
function startAnswerUpload(questionID, answerSelected, answer) {
    var question_id = questionID;
    var correct_answer = answer;
    var answer_selected = answerSelected;
    var postString = "port_id="+httpPortNumber +"&question_id="+question_id+"&answer_selected="+answer_selected+"&correct_answer="+correct_answer;
    console.log(postString)
    ProcessAnswer(postString)
    };

var client; // the global variable that holds the request
//uploads the data collected from the form to the server
function ProcessAnswer(postString) {
    client = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/uploadAnswer";
    client.open('POST',url,true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = AnswerUploaded;
    client.send(postString);
};

// create the code to wait for the response from the data server, and process the response once it is received
function AnswerUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
    //number of correct answers function checks the answer submitted and load the response to the user 
    noCorrect();
    }
};



