// Tracks the latest quiz number the user has added. From 1 - whichQuizNumber gives all quizzes.
var whichQuizNumber = 1;

var assignments = ["quiz", "test1", "test2", "test3", "final"];
var assignmentNames = ["quizzes", "test 1", "test 2", "test 3", "final exam"];

/**
*	Adds another quiz entry box to the quiz section by appending the html.
*	By default, appending the html like this clears all past entries so we can save them
*	and then replace them afterwards for a seamless user experience.
*/
function addQuiz() {
	var previousEntries = new Array(whichQuizNumber);
	for (let i = 1; i <= whichQuizNumber; i++) {
	  previousEntries[i-1] = document.getElementById("quiz" + i + "score").value;
	} 
	whichQuizNumber++;
	document.getElementById("quizzes").innerHTML += "<label for=\"quiz" + whichQuizNumber + "score\">Quiz " + whichQuizNumber + " score (%):</label><input type=\"text\" id=\"quiz" + whichQuizNumber + "score\" name=\"quiz" + whichQuizNumber + "score\"><br><br>";
	for (let i = 1; i <= whichQuizNumber-1; i++) {
	  document.getElementById("quiz" + i + "score").value = previousEntries[i-1];
	} 
}

/**
*	Finds what average score would be needed on all your unknown quizzes ("?" is entered)
*	to achieve a specified quiz average.
*/
function findQuizUnknownsForGrade(grade) {
	var total = 0.0;
	var unknowns = 0;
	var totaledAverageGrade = grade * whichQuizNumber;
	for (let i = 1; i <= whichQuizNumber; i++) {
		var thisQuiz = getForNumericParsing(document.getElementById("quiz" + i + "score").value);
		if(thisQuiz != "?") {
			total += parseFloat(thisQuiz);
		} else {
			unknowns++;
		}
	}
	var remaining = totaledAverageGrade - total;
	return (remaining / unknowns);
}

/**
*	Correctly handle any textboxes that have been left empty by assuming a zero was entered instead
*	This makes it easy to parse those numbers going forward without worrying about NaN errors.
*/
function getForNumericParsing(value) {
	if(value == "") {
		return 0;
	} else {
		// Allow the user to enter score as x/y (like 25/50 is a 50%, returns 50)
		if(value.includes("/")) {
			var parts = value.split("/");
			value = (100 * parseFloat(parts[0].replace(/[^0-9$.,]/g, '') / parts[1].replace(/[^0-9$.,]/g, ''))).toString();
		}
		value = value.replace(/[^0-9$.,]/g, ''); // this regex removes non-numeric
		if(value == "") { // value was only non-numeric...
			value = "0";
		}
		return value;
	}
}

/**
*	Determines if the user entered any unknown grades ("?") for a quiz.
*	This use case probably isn't important because the user will care more about tests/finals 
*	but it's still good to have.
*/
function quizisUnknown() {
	for (let i = 1; i <= whichQuizNumber; i++) {
	  if((getForNumericParsing(document.getElementById("quiz" + i + "score").value)) == "?") {
		  return true;
	  }
	} 
	return false;
}

/**
*	Averages the values of all quiz scores together.
*	This assumes no "?" has been entered so quizisUnknown() should be called first.
*/
function averageQuizzes(){
	var total = 0.0;
	for (let i = 1; i <= whichQuizNumber; i++) {
	  total += parseFloat(getForNumericParsing(document.getElementById("quiz" + i + "score").value));
	} 
	return (total / whichQuizNumber);
}

/**
*	Helper method to get quiz weighting.
*/
function getQuizgetWeight() {
	return parseFloat(getForNumericParsing(document.getElementById("quizweight").value));
}

/**
*	Helper method to get generic weighting.
*/
function getWeight(id) {
	return parseFloat(getForNumericParsing(document.getElementById(id + "weight").value));
}

function getScore(id) {
	// special case for quizzes because we need to average them all first
	if(id == "quiz") {
		return averageQuizzes();
	} else {
		return getForNumericParsing(document.getElementById(id + "score").value);
	}
}

function isUnknown(id) {
	// special case for quizzes because if any are unknown, the entire quiz score is unknown
	if(id == "quiz") {
		return quizisUnknown();
	} else {
		return document.getElementById(id + "score").value == "?"
	}
}

/**
*	Performs basic sanity checking on weights to make sure they add up to 100%.
*	In practice it's likely for them not to add exactly to 100% because the user might enter 33.33 for the values.
*	So just check that it's close enough.
*/
function checkForPossibleErrors() {
	var weights = 0;
	for (let i = 0; i <= assignments.length-1; i++) {
		weights += getWeight(assignments[i]);
	}
	if(weights > 100.2 || weights < 99.8) {
		alert("Assignment weight does not add up to 100 (actual: " + weights + "). Grade calculation will continue, but result will not be accurate.");
	}
}

/**
*	Turns a score + weight into a weighted grade that can be adeed into a running total.
*/
function applyWeighting(score, weight) {
	return (parseFloat(score) * (parseFloat(weight) / 100.0));
}

function applyCalculationForAssignment(assignmentId, assignmentName, currentRunningScore, currentMissingWeight, currentMissingAssignmentsName) {
	if(isUnknown(assignmentId)) {
		currentMissingWeight += getWeight(assignmentId);
		if(currentMissingAssignmentsName == "") {
			currentMissingAssignmentsName = assignmentName;
		} else {
			currentMissingAssignmentsName = "your other assignments";
		}
	} else {
		currentRunningScore += applyWeighting(getScore(assignmentId), getWeight(assignmentId));
	}
	return [currentRunningScore, currentMissingWeight, currentMissingAssignmentsName];
}

/**
*	Negative numbers make no sense in this context, so they should be changed to zero.
*/
function setToZeroIfNegative(score) {
	if(score <= 0) {
		score = 0;
	}
	return score;
}

/**
*	Modifies all user input values to remove non-numeric characters and put change to a percentage.
*/
function formatAllTextboxes() {
	for (let i = 0; i <= assignments.length-1; i++) {
		document.getElementById(assignments[i] + "weight").value = getWeight(assignments[i]).toString() + "%";
		if(assignments[i] != "quiz" && !isUnknown(assignments[i])) {
			document.getElementById(assignments[i] + "score").value = getScore(assignments[i]).toString() + "%";
		}
	}
	document.getElementById("desiredscore").value = getForNumericParsing(document.getElementById("desiredscore").value) + "%";
	for (let i = 1; i <= whichQuizNumber; i++) {
		var thisQuiz = getForNumericParsing(document.getElementById("quiz" + i + "score").value);
		if(thisQuiz != "?") {
			document.getElementById("quiz" + i + "score").value = thisQuiz + "%";
		}
	}
}

/**
*	Either calculates the user's known grade (if all entered as known) or
*	calculates what the user would need to get on tests/exam to get the entered desired grade.
*/
function calculateGrade() {
	formatAllTextboxes();
	checkForPossibleErrors();
	var score = 0;
	var missingWeight = 0;
	var required = "";
	var desiredGrade = getForNumericParsing(document.getElementById("desiredscore").value);
	var assignmentName = "";
	var quizSummaryLine = "";

	
	for (let i = 0; i <= assignments.length-1; i++) {
	  	var assignmentResult = applyCalculationForAssignment(assignments[i], assignmentNames[i], score, missingWeight, assignmentName);
		score = assignmentResult[0];
		missingWeight = assignmentResult[1];
		assignmentName = assignmentResult[2];
	} 
	
	if(missingWeight != 0) {
		var scoreDiff = parseFloat(desiredGrade) - score;
		required = (scoreDiff / (missingWeight / 100));
	}
	
	if(required != "") {
		document.getElementById("results").innerHTML = "<h3>For your final score to be " + parseFloat(desiredGrade).toFixed(2) + "%, you must earn a score of " + setToZeroIfNegative(required).toFixed(2) + "% on " + assignmentName + ".</h3>";
		if(quizisUnknown()) {
			document.getElementById("results").innerHTML += "<h3>For a quiz average of " + required.toFixed(2) + "%, you must earn an average score of " + setToZeroIfNegative(findQuizUnknownsForGrade(required)).toFixed(2) + "% on your remaining quizzes.</h3>";
		}
	} else {
		document.getElementById("results").innerHTML = "<h3>Final score: " + score.toFixed(2) + "%</h3>";
	}
	
	// Without this, user might not see the result since it appears at the bottom of the screen.
	document.getElementById("bottom").scrollIntoView();
}
