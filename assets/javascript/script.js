var score = 0;
// copy arry of questions to make changes to;
var questionArr = [];
// use to track questions asked;
var countQuestion = 0;
// all buttons
var $buttons = $("#button1, #button2, #button3, #button4");
// id for the High Scores form;
var submitName = $("#code-form");
// id for the High Scores input;
var submitInput = $("#input");
// array to hold user data, appended to ol ("#high-score");
var scoreArr = [];

var questions = [
	{
		title: "Commonly used data types DO NOT include:",
		choice: ["strings", "alerts", "booleans", "numbers"],
		answer: "alerts"
	},
	{
		title: "The condition in an if / else statement is enclosed within ____.",
		choice: ["quotes", "curly brackets", "parentheses", "square brackets"],
		answer: "parentheses"
	},
	{
		title: "jQuery and the internet, are a type of what?",
		choice: ["programs", "AI's", "softwares", "API's"],
		answer: "API's"
	},
	{
		title:
			"What is the default behavior called that is used to move declarations to the top of the current scope?",
		choice: ["sorting", "arranging", "hoisting", "looping"],
		answer: "hoisting"
	},
	{
		title:
			"What is the format called that is used for storing and transporting data?",
		choice: ["syntax", "html", "boolean", "JSON"],
		answer: "JSON"
	},
	{
		title:
			"What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
		choice: ["while", "durning", "for", "after"],
		answer: "while"
	},
	{
		title: "What defines the accessibility and visibility of variables",
		choice: ["range", "definition", "depth", "scope"],
		answer: "scope"
	},
	{
		title:
			"where is the javascript link found without adding an attribute to defer",
		choice: ["<head>", "<body>", "<style>", "<script>"],
		answer: "<body>"
	}
];

$(".questions").text(
	"Press start to begin the quiz, you will have 80 seconds to complete the quiz."
);

var countdown = 80;
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
// game function call to start the timer and get questions;
function startGame() {
	$(".start").addClass("hide");
	$(".answer").removeClass("answer");
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
	$("#code").addClass("hide");
	// "this" is the index position relevant to the click and to the countQuestion,
	// so the button that is being clicked;
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

function endGame() {
	$buttons.addClass("hide");
	$("#question").addClass("hide");
	$("#code").text("HIGH SCORES");
	$("#input").removeClass("hide");
	$("#code").removeClass("hide");
	loadScores();
	countdown = 1;
}

submitName.on("submit", function(e) {
	e.preventDefault();
	// console.log($(this));

	printScore();
	scoreValues();
	restartGame();
});

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
function scoreValues() {
	for (i = 0; i < scoreArr.length; i++) {
		// console.log(scoreArr[i]);
		var newLi = $("<li>").text(scoreArr[i]);
		var listItems = $("#high-score");
		listItems.append(newLi);
	}
}

function loadScores() {
	var getScores = localStorage.getItem("listItems");
	var gotScores = JSON.parse(getScores);
	// debugger;
	if (gotScores != null) {
		scoreArr = gotScores;
	}
}

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
