var posterURL;
//getting upload button.
var uploadBtn = document.getElementById('uploadBtn');
//listen for file selection.
if(uploadBtn) {
	uploadBtn.addEventListener('change', function(e) {
		var eventName = document.getElementById('eventName');
		//get the file.
		var file = e.target.files[0];
		//creating a storage reference.
		var storageRef = firebase.storage().ref('posters/' + file.name);
		//upload the file.
		var uploadTask = storageRef.put(file);
		//register three observers
		uploadTask.on('state_changed', function(snapshot) {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done.');
			switch (snapshot.state) {
			    case firebase.storage.TaskState.PAUSED: // or 'paused'
			      console.log('Upload is paused');
			      break;
			    case firebase.storage.TaskState.RUNNING: // or 'running'
			      console.log('Upload is running');
			      break;
			  }
		}, function(error) {

		}, function() {
			//getting the poster url.
			posterURL = uploadTask.snapshot.downloadURL;
			document.getElementById('createEvent').disabled = false;
		});
	});

	uploadBtn.addEventListener('change', function(e) {
		var eventName = document.getElementById('eventName');
		//get the file.
		var file = e.target.files[0];
		//creating a storage reference.
		var storageRef = firebase.storage().ref('posters/' + file.name);
		//upload the file.
		var uploadTask = storageRef.put(file);
		//register three observers
		uploadTask.on('state_changed', function(snapshot) {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done.');
			switch (snapshot.state) {
			    case firebase.storage.TaskState.PAUSED: // or 'paused'
			      console.log('Upload is paused');
			      break;
			    case firebase.storage.TaskState.RUNNING: // or 'running'
			      console.log('Upload is running');
			      break;
			  }
		}, function(error) {

		}, function() {
			//getting the poster url.
			posterURL = uploadTask.snapshot.downloadURL;
			document.getElementById('createEvent').disabled = false;
		});
	});
}
//adding data to the database.
function addNewEvent() {
	//storing inputs into variables.
	var eventName = document.getElementById('eventName');
	var studentBody = document.getElementById('studentBody');
	var date = document.getElementById('date');
	var fee = document.getElementById('fee');
	var contactPerson = document.getElementById('contactPerson');
	var contact = document.getElementById('contact');
	var location = document.getElementById('location');
	var eventDesc = document.getElementById('eventDesc');
	var reward = document.getElementById('reward');

	if (eventName.value.length == 0 || studentBody.value.length == 0 || date.value.length == 0 || fee.value.length == 0 || contactPerson.value.length == 0 || contact.value.length == 0 || location.value.length == 0 || eventDesc.value.length == 0 || reward.value.length == 0) {
		return;
	}
	//getting a database service reference.
	var dbRef = firebase.database();
	var id = + new Date();

	dbRef.ref('events/' + id).set({
		name: eventName.value,
		studentBody: studentBody.value,
		date: date.value,
		fee: fee.value,
		contactPerson: contactPerson.value,
		contact: contact.value,
		location: location.value,
		desc: eventDesc.value,
		reward: reward.value,
		isApproved: false,
		votes: 0,
		posterURL: posterURL
	});

	var event;
	var encode64;

	dbRef.ref('events/' + id).on("value", function(snapshot) {
		event = snapshot.val();
		encode64 = btoa(JSON.stringify(event));
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	window.open("./eventQRCode.html?id=" + encode64);
}