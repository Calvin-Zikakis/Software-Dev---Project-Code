

/* search string splited into array */
var key_words;
/* selected search topic */
var search_topic;

/* click search button */
function search_begin(){
	var search_topic = document.getElementById("search_topic").value;
	if(search_topic == "Select Topic"){
		alert("Please select a topic");
	}
	else{
		/* search log */
		location.href = "resultPage.html"
	}
}


