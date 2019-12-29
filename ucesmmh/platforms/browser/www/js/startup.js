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