var counter;

var game = {
	time: 31,
	pause: 6,
	questionNumber: 1,
	correct: 0,
	incorrect: 0,
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
			game.wrongAnswer()
		}
	},
	newPage: function() {
		localTime = parseInt(game.time)
		counter = setInterval(game.decreaseTimer, 1000)
		//console.log(game.questionNumber-1)
		$('#start').hide()
		$('#time-remaining').show()
		$('#time').html(30)
		$('#question').html(game.questions[(game.questionNumber-1)])
		$('#choices').show()
		$('#choice1').html(game.choices[game.questionNumber-1][0])
		$('#choice2').html(game.choices[game.questionNumber-1][1])
		$('#choice3').html(game.choices[game.questionNumber-1][2])
		$('#choice4').html(game.choices[game.questionNumber-1][3])

		// $('.selection').on('click', function(event){
		// 	console.log(event)
		// 	console.log('selection button clicked')
		// 	if (event.value == game.answers[game.questionNumber-1]){
		// 		game.correctAnswer
		// 	}else {
		// 		game.wrongAnswer
		// 	}
		// 	game.questionNumber++
		// })
	},
	correctAnswer: function() {
		game.correct++
		clearInterval(counter)
		$('#page-response').html('Correct!')
		$('#question').hide()
		$('#choices').hide()
		var pauseTime = setTimeout(game.newPage, 5000)
	},
	wrongAnswer: function() {
		game.incorrect--
		clearInterval(counter)
		$('#page-response').html('Nope!')
		$('#question').hide()
		$('#choices').hide()
		var pauseTime = setTimeout(game.newPage, 5000)
	},
	results: function() {

	},
	restart: function() {

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