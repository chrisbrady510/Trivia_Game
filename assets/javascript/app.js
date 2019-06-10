var triviaQuestions = [{
	question: "Which Oakland Athetics Player has hit 145 home runs since 2016?",
	answerList: ["Mark Canha", "Jurickson Profar", "Matt Olson", "Khris Davis"],
	answer: 3
},{
	question: "Since his MLB debut in 2016, he has become known as the 'Laser'?",
	answerList: ["Ramon Laureano", "Keith Foulke", "Mark Canha", "Chad Pinder"],
	answer: 0
},{
	question: "In what year did the Athletics move to Oakland?",
	answerList: ["1975", "1968", "1934", "1989"],
	answer: 1
},{
	question: "He is one of 30 pitchers in the history of baseball, to have more than one career no hitter",
	answerList: ["Frankie Montas", "Wei-Chung-Wang", "Mike Fiers", "Yusimero Petit"],
	answer: 2
},{
	question: "Who did Oakland beat in the 1989 World Series?",
	answerList: ["SF Giants", "LA Dodgers", "Toronto Blue Jays", "New York Mets"],
	answer: 0
},{
	question: "This player had the most defensive runs saved in the American League",
	answerList: ["Milton Bradley", "Matt Chapman", "Stephen Piscotty", "Matt Olson"],
	answer: 1
},{
	question: "This 2011 film starred Brad Pitt, and was a nod to the Athletics frugal approach to spending on players?",
	answerList: ["Major League", "Angels in the Outfield", "Field of Dreams", "Moneyball"],
	answer: 3
},{
	question: "Through the late 1988-1996, this tandem were known as the Bash Brothers?",
	answerList: ["Mark McGwire and Jose Canseco", "Yoenis Cespedes and Josh Donaldson", "Gregorio Petit and Mark Ellis", "Milton Bradley and Frank Thomas"],
	answer: 0
},{
	question: "This song is played at the coliseum after every Athletics win?",
	answerList: ["It's the final Countdown", "Island in the Sun", "Celebration", "Thunderstruck"],
	answer: 2
},{
	question: "This rangy Oakland first-baseman was second on the team in HR in 2018, with 29?",
	answerList: ["Josh Phegley", "Brent Mayne", "Lou Trivino", "Matt Olson"],
	answer: 3
},{
	question: "This A's relief pitcher had a historic 2018, posting a sub 0.50 ERA while notching 39 saves?",
	answerList: ["Fernando Rodney", "Jarrod Cozart", "Jonathan Lucroy", "Blake Trienen"],
	answer: 3
},{
	question: "This Oakland Athletics catcher was backup to Jonathan Lucroy for the majority of 2018?",
	answerList: ["Jason Kendall", "Jed Lowrie", "Josh Phegley", "Marco Estrada"],
	answer: 2
},{
	question: "This former A's outfielder had an name appropriate walk-up song, 'Game Over'?",
	answerList: ["Milton Bradley", "Jason Monopoly", "Curtis Backgammon", "Lucas Chess"],
	answer: 0
},{
	question: "This Oakland utility player has a name which rhymes with a popular dating app",
	answerList: ["Yuveneski Binder", "Chad Pinder", "Charlie Batch", "Carl Trumble"],
	answer: 1
},{
	question: "The Oakland A's acquired this 24-year-old middle infielder as a replacement for Jed Lowrie?",
	answerList: ["Marcus Semien", "Marco Scutaro", "Jurickson Profar", "Carlos Correa"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
