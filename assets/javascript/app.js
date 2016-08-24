var counter;

var game = {
	time: 31,
	pause: 6,
	questionNumber: 1,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	questions: ['Question 1', 'Question 2', 'Question 3', 'Question 4'],
	choices: [['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']],
	answers: ['a', 'b', 'c', 'd'],
	initialPage: function() {
		$('#time-remaining').hide()
		//$('#time-remaining').hide()
		$('#question').empty()
		//$('#question').hide()
		$('#choices').hide()

		$('#start').html('Start Game!')
	},
	decreaseTimer: function() {
		//localTime = parseInt(game.time)
		localTime--
		$('#time').html(localTime)
		if (localTime == 0){
			clearInterval(counter)
			game.questionNumber++
			console.log('unanswered condition criteria met')
			game.noAnswer()
		}
	},
	newPage: function() {
		if (game.questionNumber <= 4) {
			localTime = parseInt(game.time)
			counter = setInterval(game.decreaseTimer, 1000)
			//console.log(game.questionNumber-1)
			$('#start').hide()
			$('#page-response').empty()
			$('#time-remaining').show()
			$('#time').html(30)
			$('#question').empty()
			$('#question').show()
			$('#question').html(game.questions[(game.questionNumber-1)])
			$('#choices').show()
			$('#choice1').html(game.choices[game.questionNumber-1][0])
			$('#choice2').html(game.choices[game.questionNumber-1][1])
			$('#choice3').html(game.choices[game.questionNumber-1][2])
			$('#choice4').html(game.choices[game.questionNumber-1][3])
		}else {
			game.results()
		}
	},
	correctAnswer: function() {
		game.correct++
		clearInterval(counter)
		$('#page-response').html('Correct!')
		$('#question').hide()
		$('#choices').hide()
		if (game.questionNumber < 5) {
			var pauseTime = setTimeout(game.newPage, 5000)
		}else {
			var pauseTime = setTimeout(game.results, 5000)
		}
	},
	noAnswer: function() {
		game.unanswered++
		clearInterval(counter)
		$('#page-response').html('Nope!')
		$('#question').hide()
		$('#choices').hide()
		if (game.questionNumber < 5) {
			var pauseTime = setTimeout(game.newPage, 5000)
		}else {
			var pauseTime = setTimeout(game.results, 5000)
		}
	},
	wrongAnswer: function() {
		game.incorrect++
		clearInterval(counter)
		$('#page-response').html('Nope!')
		$('#question').hide()
		$('#choices').hide()
		if (game.questionNumber < 5) {
			var pauseTime = setTimeout(game.newPage, 5000)
		}else {
			var pauseTime = setTimeout(game.results, 5000)
		}
	},
	results: function() {
		$('#page-response').html("All done, here's how you did!")
		$('#page-response').append('<div>Correct Answers: ' + game.correct + '</div>')
		$('#page-response').append('<div>Incorrect Answers: ' + game.incorrect + '</div>')
		$('#page-response').append('<div>Unanswered: ' + game.unanswered + '</div>')
		$('#start').show()
		$('#start').html('Start Over?')

		$('#start').on('click', game.restart)
	},
	restart: function() {
		counter = undefined
		game.questionNumber = 1
		game.correct = 0
		game.incorrect = 0
		game.unanswered = 0

		$('#time-remaining').hide()
		$('#page-response').empty()
		$('#question').empty()
		$('#choices').hide()

		game.newPage()
	}
}

$(document).ready(function(){
	game.initialPage()

	$('#start').on('click', game.newPage)
	$('.selection').on('click', function(event){
		console.log($(event.target).html())
		console.log('selection button clicked')
		if ($(event.target).html() == game.answers[game.questionNumber-1]){
			console.log('correct answer condition met')
			game.correctAnswer()
		}else {
			console.log('incorrect answer condition met')
			game.wrongAnswer()
		}
		game.questionNumber++
	})
})