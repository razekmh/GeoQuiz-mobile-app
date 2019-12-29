//The code is adopted from the web and mobile module practicals
function startup() {
	document.addEventListener('DOMContentLoaded', function() {
        loadmap();
        getQuestions();
        trackLocation();
        //closestFormPoint();
		}, false);
    };
    
getPort();
startup();