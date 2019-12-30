var score = 0;
// copy arry of questions to make changes to;
var questionArr = [];
// use to track questions asked;
var countQuestion = 0;
//
var $buttons = $("#button1, #button2, #button3, #button4");

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
		choice: ["for", "durning", "while", "after"],
		answer: "while"
	},
	{
		title: "What defines the accessibility and visibility of variables",
		choice: ["range", "definition", "depth", "scope"],
		answer: "scope"
	},
	{
		title:
			"where is the javascript link found without adding a attribute to defer",
		choice: ["<head>", "<body>", "<style>", "<script>"],
		answer: "<body>"
	}
];
// let shuffledQuestion = questions[Math.random(Math.floor() * questions.length)];
// begin the game;
$(".questions").text(
	"Press start to begin the quiz, you will have 10 seconds per question."
);
// start the quiz;
$("#startQuiz").on("click", startGame);
// game function
function startGame() {
	$(".start").addClass("start-hide");
	$(".answer").removeClass("answer");
	getQuestion();
}
// get a question & get a new question.
function getQuestion() {
	if (countQuestion < questions.length) {
		$(".questions").text(questions[countQuestion].title);

		// todo: generate buttons from choices
		$buttons.each(function(i) {
			var $button = $(this);
			$button.text(questions[countQuestion].choice[i]);
		});
	}
}

$buttons.on("click", function() {
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
