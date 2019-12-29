
var getRankingclient; 
function getRanking() {
    getRankingclient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getRanking/"+ httpPortNumber;
    getRankingclient.open('GET',url,true);
    getRankingclient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getRankingclient.onreadystatechange = getRankingUploaded;
    getRankingclient.send();
};

function getRankingUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (getRankingclient.readyState == 4) {
    // change the DIV to show the response
    
    getRankingdata = getRankingclient.responseText;
    rank = JSON.parse(getRankingdata)[0].array_to_json[0].rank;
    alert ("Your rank currently is " + rank);
    }};