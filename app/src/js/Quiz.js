QUIZAPP.extend(QUIZAPP, 'Quiz');

QUIZAPP.Quiz = (function () {

    var questionsList = [],
        counter = 0,
        correctAnswers = 0,
        $card = $('.m-card'),
        $quiz = $('<div class="m-quiz"></div>'),
        $btnNextQuestion = $('<button id="nextQuestion" class="m-btn" disabled>Next Question</button>');

    function init() {
        $card.on('click', '#startQuiz', loadQuiz);
        $card.on('click', 'a.m-quiz__answer', selectAnswer);
        $card.on('click', '#nextQuestion', changeQuizQuestion);
        $card.on('click', '#restartQuiz', restartQuiz);
    }

    function changeQuizQuestion() {
        checkUserAnswer();
        counter++;
        if (counter > questionsList.length - 1) {
            showResults(getUserScore());
            return;
        }
        loadQuestion();
        disableButton($(this));
    }

    function loadQuiz(event) {
        event.preventDefault();
        $card.empty().addClass('is-loading');

        var questionsPromise = QUIZAPP.Utils.getQuizQuestions();
        questionsPromise.done(function (result) {
            questionsList = result;
            $card.removeClass('is-loading').append($quiz).append('<div class="m-text--left"></div>').find('.m-text--left').append($btnNextQuestion);
            loadQuestion();
        }).fail(function (error) {
            $card.removeClass('is-loading').html(error);
            //console.log(error);
        });

    }

    function loadQuestion() {
        $quiz.empty().prepend('<h2>' + questionsList[counter].question + '</h2>').append('<ul class="m-quiz__list"></ul>');
        $.each(questionsList[counter].choices, function (index, value) {
            $('.m-quiz__list').append('<li><a href="#" class="m-quiz__answer">' + value + '</a></li>');
        });
    }

    function selectAnswer(event) {
        event.preventDefault();
        $('a.m-quiz__answer').removeClass('is-selected');
        $(this).addClass('is-selected');
        enableButton($btnNextQuestion);
    }

    function checkUserAnswer() {
        var userAnswer = $quiz.find('.m-quiz__answer.is-selected').html();
        if (userAnswer === questionsList[counter].choices[questionsList[counter].correctAnswer]) {
            correctAnswers++;
        }
    }

    function getUserScore() {
        return ((correctAnswers * 100) / questionsList.length).toFixed();
    }

    function showResults(score) {
        $quiz.empty()
            .append('<div class="m-results"></div>')
            .children().first()
            .append('<p class="m-results__description">Congratulations for completing the quiz! You scored:</p>')
            .append('<p class="m-results__score">' + score + '%</p>')
            .append('<a href="#" id="restartQuiz" class="m-btn m-btn--reload">Restart Quiz</a>');
        $btnNextQuestion.hide();
    }

    function restartQuiz() {
        location.reload();
    }

    function enableButton(button) {
        button.attr('disabled', false);
    }

    function disableButton(button) {
        button.attr('disabled', true);
    }

    return {
        init: init
    };

})();