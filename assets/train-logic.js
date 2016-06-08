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



////NEXT ARRIVE && MIN AWAY APP
 // moment($("#firstTimeInput").val().trim(), "HH:mm").format("X");

	// // Prettify the employee start
	// var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
	
	// // To calculate
	// var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
	// console.log(empMonths);

	// // Calculate the total billed rate
	// var empBilled = empMonths * empRate;
	// console.log(empBilled);



	// Add each train's data into the table

	// $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrive + "</td><td>" + minAway + "</td><td>");

});



