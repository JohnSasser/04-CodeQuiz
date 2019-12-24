// create elements that appear when the page loads,
//  - create class that hides all the other button and displays the start button, flip when clicked.
//  - start button and intro
//  - put them over the #questions div
//  - begin countdown when the start button is clicked()

// create an array of objects. give a key to the question, choices and answer;
//  - function that will

// create functions with if/else conditions for the answers to the questions

const questions = [
	{
		title: "Commonly used data types DO NOT include:",
		choices: ["strings", "booleans", "alerts", "numbers"],
		answer: "alerts"
	},
	{
		title: "The condition in an if / else statement is enclosed within ____.",
		choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
		answer: "parentheses"
	}
];
$(".question").text("Press Start To Begin The Quiz & Start Your Timer!");

$("#start").on("click", function() {
	$(".main-container").css("width: ", "70%");
	$("#start").hide();
	$(".answer").removeClass("answer");
});
