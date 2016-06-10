//Link to Firebase
var trainData = new Firebase("https://train-logic.firebaseio.com/");

//Button for adding trains

$("#addATrain").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	var trainStartTime = $("#firstTimeInput").val().trim();
	var trainFreq = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name: trainName,
		destination: trainDest,
		start: trainStartTime,
		frequency: trainFreq,
	}

	// Uploads train data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency)

	// Alert
	alert("Train has been successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTimeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainStartTime = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().frequency;

	// Train Info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainStartTime);
	console.log(trainFreq);


//Train Time Equations

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(trainStartTime,"hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % trainFreq;
	console.log(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = trainFreq - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))



	// Add each train's data into the table

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>");

});



