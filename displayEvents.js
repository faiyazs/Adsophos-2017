var dbRef = firebase.database();

dbRef.ref('events/').on("value", function(snapshot) {
	var events = snapshot.val();
	var eventsArray = $.map(events, function (value, index) {
		var div = document.createElement("DIV");

		var name = document.createElement("H3");
		var h3 = document.createTextNode(value.name);
		name.appendChild(h3);

		var desc = document.createElement("P");
		var p = document.createTextNode(value.desc);
		desc.appendChild(p);

		var poster = document.createElement("IMG");
		poster.setAttribute("src", value.posterURL);
		poster.setAttribute("class", "img-responsive");
		poster.setAttribute("style", "max-width: 30%; max-height: 30%");
		poster.setAttribute("alt", "EVENT POSTER");

		var fee = document.createElement("P");
		

		div.appendChild(name);
		div.appendChild(desc);
		div.appendChild(poster);
		return div;
	});
	for (var i = 0; i < eventsArray.length; i++) {
		document.getElementById("main").appendChild(eventsArray[i]);
	}

}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});