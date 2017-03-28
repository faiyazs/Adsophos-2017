var dbRef = firebase.database();
console.log(eventPath)

function getEventHeadingHtml(heading){
	return "<h1><a>" + heading + "</a></h1>"
}

function getEventDescHtml(value){

	return "<div class='six columns right'>"
	+"<h3>Event Details.</h3>"
	+"<p>"+value.desc+"</p><br/>"
	+"<b>Details</b><br/>"
	+"<p>Location: "+value.location+""
	+"<p>"
	+"</div>"
}

dbRef.ref('events/').orderByChild("studentBody").equalTo(eventPath).on("value", function(snapshot) {
	var events = snapshot.val();
	console.log(events)
	var eventsArray = $.map(events, function (value, index) {
		var eventList = document.getElementById("eventList")
		var section = document.createElement("section")
		section.id = "features"
		var sectionHead = document.createElement("div")
		sectionHead.className = "row section-head"
		sectionHead.id = index
		sectionHead.innerHTML = getEventHeadingHtml(value.name)
		// var eventName = document.createElement("a")
		// eventName.innerHTML = value.name
		
		// var eventNameHeading = document.createElement("h1")
		// eventNameHeading.appendChild(eventName)

		// sectionHead.appendChild(eventNameHeading)		
		section.appendChild(sectionHead)
		eventList.appendChild(section)
		console.log(section)

	// 	<section id='features'>
 //    <div class="row section-head" id="robot5">
 //      <h1><a name="events">Maze Runner</a></h1>
 //      <div class="row feature design">
 //         <div class="six columns right">
 //            <h3>Event Details.</h3>
 //            <p> RoboMaze is a network of paths and hedges designed as a puzzle through which one has to find a way through a Robot. The participants are required to make their own robot for solving the puzzle in the shortest period of time. The challenge here is to find the shortest path to solve the puzzle. Your patience, ability to understand the surroundings & critical thinking skills will be tested here. So enrol and unlock your potential!
 //            </p>
 //            <br/><br/>
	// 	        <a href="assets/Mazerunner.pdf">
 //              <button type="button" class="btn btn-primary">Rule Book/Details</button>
 //            </a>
 //            <br/> <br/>
 //            <p>Vote For This Event</p>
 //            <button type="button" class="btn btn-primary">Vote</button>

 //          </div>
 //         <div class="six columns feature-media left" >
 //             <img src="assets/mazehex.png" alt="" />
 //         </div>
 //     </div>
 //   </div>
 //  </div>
	// <div class="row section-head">
 //         <div class="twelve columns">
 //           <a  class="button" href="https://goo.gl/forms/QDBGIGmeX6Njqaf42">Register Here</a>
 //            </div>
 //            <p><small> &nbsp; &nbsp;Registration for Robolympia 2k17.</small></p>

 //         </div>
 //   </section>

		// var div = document.createElement("DIV");

		// var name = document.createElement("H3");
		// var h3 = document.createTextNode(value.name);
		// name.appendChild(h3);

		// var desc = document.createElement("P");
		// var p = document.createTextNode(value.desc);
		// desc.appendChild(p);

		// var poster = document.createElement("IMG");
		// poster.setAttribute("src", value.posterURL);
		// poster.setAttribute("class", "img-responsive");
		// poster.setAttribute("style", "max-width: 30%; max-height: 30%");
		// poster.setAttribute("alt", "EVENT POSTER");

		// var fee = document.createElement("P");
		

		// div.appendChild(name);
		// div.appendChild(desc);
		// div.appendChild(poster);
		return section;
	});
	// for (var i = 0; i < eventsArray.length; i++) {
	// 	document.getElementById("main").appendChild(eventsArray[i]);
	// }

}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});