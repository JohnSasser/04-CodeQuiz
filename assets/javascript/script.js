var score = 0;
// copy arry of questions to make changes to;
var questionArr = [];
// use to track questions asked;
var countQuestion = 0;
// all buttons;
var $buttons = $("#button1, #button2, #button3, #button4");
// id for the High Scores form;
var submitName = $("#code-form");
// id for the High Scores input;
var submitInput = $("#input");
// array to hold user data, appended to ul ("#high-score") and sent to local storage;
var scoreArr = [];

// import { questions } from "./object";
// $.getScript("./object");

$(".questions").text(
	"Press start to begin the quiz, you will have 80 seconds to complete the quiz."
);
// countdown is used to set the starting time
var countdown = 80;
// time interval set to one second that decrements and changes the,
// css attribute at the 50% and 20% mark on time left;
function setTime() {
	var timerInterval = setInterval(function() {
		countdown--;
		$("#seconds").text(countdown + " :SECONDS LEFT");
		if (countdown == 40) {
			$("#seconds").css("color", "orange");
		} else if (countdown == 15) {
			$("#seconds").css("color", "red");
		} else if (countdown == 0) {
			clearInterval(timerInterval);
			endGame();
		}
	}, 1000);
}
// start the quiz;
$("#startQuiz").on("click", startGame);
// game function call to start the timer and get questions,
// also load the scores from local storage and start the countdown;
function startGame() {
	$(".start").addClass("hide");
	$(".answer").removeClass("answer");
	$("#code").addClass("hide");
	getQuestion();
	loadScores();
	setTime();
}
// get a question & get a new question;
function getQuestion() {
	if (countQuestion < questions.length) {
		$(".questions").text(questions[countQuestion].title);
		// generate buttons from choices;
		$buttons.each(function(i) {
			// (this) == the current button in the loop;
			// setting the poison of the text and buttons;
			// giving button value from object;
			var $button = $(this);
			$button.text(questions[countQuestion].choice[i]);
		});
	} else {
		endGame();
	}
}

// checking if button clicked choice == answer;
$buttons.on("click", function() {
	// $(this) is the index position relevant to the click and to the countQuestion[index],
	// so...the button that is being clicked;
	var $buttonText = $(this).text();
	var $answer = questions[countQuestion].answer;
	if ($buttonText === $answer) {
		score += 10;
	} else {
		score -= 5;
	}
	$("#score").text("SCORE: " + score);
	countQuestion++;
	getQuestion();
});
// hides all questions{} and shows the high scores board;
function endGame() {
	$buttons.addClass("hide");
	$("#question").addClass("hide");
	$("#code").text("HIGH SCORES");
	$("#input").removeClass("hide");
	$("#code").removeClass("hide");
	loadScores();
	countdown = 1;
}
// submit event for the high scores page;
submitName.on("submit", function(e) {
	e.preventDefault();
	// console.log($(this));

	printScore();
	scoreValues();
	restartGame();
});
// saves the submit events value for high score username to a var,
// pushes the value and the score to an array;
// sends the array to local storage;
function printScore() {
	var scoreName = submitInput.val();
	var highScores = scoreName + " : " + score;
	scoreArr.push(highScores);
	var stringifyListItems = JSON.stringify(scoreArr);
	localStorage.setItem("listItems", stringifyListItems);
	// console.log(highScores);
	// console.log(scoreArr);
	// console.log(stringifyListItems);
}
// create list-items for the username and score,
// print the values collected before and append them to the div id;
function scoreValues() {
	for (i = 0; i < scoreArr.length; i++) {
		// console.log(scoreArr[i]);
		var newLi = $("<li>").text(scoreArr[i]);
		var listItems = $("#high-score");
		listItems.append(newLi);
	}
}
// retrieve the user name and score from local storage,
// parse the scores from printScores and have them ready for loading the game;
function loadScores() {
	var getScores = localStorage.getItem("listItems");
	var gotScores = JSON.parse(getScores);
	// debugger;
	if (gotScores != null) {
		scoreArr = gotScores;
	}
}
// give a way to restart the game or head back to the portfolio,
// this was the only button group I did not create in html.
function restartGame() {
	var restartButton = $("<button>");
	var portfolioLink = $(
		"<a href=https://johnsasser.github.io/02-bsPortfolio/portfolio.html>"
	);
	portfolioLink
		.addClass("btn btn btn-block")
		.text("Back to Portfolio")
		.css("size", "100%");
	restartButton.addClass("btn btn btn-block").text("Take Quiz Again");
	$("#answers").append(portfolioLink);
	$("#answers").append(restartButton);
	restartButton.on("click", function() {
		location.reload(true);
	});
}
