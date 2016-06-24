$(document).ready(function () {

    var Quiz = (function () {
        var allQuestions = [{
            question: "Which is the largest mammal on earth ?",
            choices: ["African Elephant", "Rhinoceros", "Giraffe", "Blue Whale"],
            correctAnswer: 3
            }, {
            question: "What species of Ant is the Anteater careful to avoid ?",
            choices: ["Soldier Ant", "Fire Ant", "Black Bog Ant", "Red Barbed Ant"],
            correctAnswer: 0
            }, {
            question: "There are 2 main species of Bison, the American Bison and the Wisent. What are the Wisent commonly known as ?",
            choices: ["Asian Bison", "European Bison", "Russian Bison", "Arctic Bison"],
            correctAnswer: 1
            }, {
            question: "China's endangered giant pandas subsist almost entirely on what food ?",
            choices: ["Eucalyptus", "Hazelnuts", "Bamboo", "None of the above"],
            correctAnswer: 2
            }, {
            question: "What is a domesticated Caribou referred to as ?",
            choices: ["Antelope", "Reindeer", "Moose", "Elk"],
            correctAnswer: 1
            }, {
            question: "Cheetahs are the fastest cats on earth, but what can't they do like other big cats ?",
            choices: ["They cannot climb trees", "They cannot see very far", "They cannot roar", "They cannot hear very good"],
            correctAnswer: 2
            }, {
            question: "The Jarkov Mammoth is the ancestor of which of todays animals ?",
            choices: ["Hippopotamus", "Elephant", "Rhinoceros", "Buffalo"],
            correctAnswer: 1
            }, {
            question: "Which big cat has the strongest bite relative to its weight ?",
            choices: ["Tiger", "Leopard", "Jaguar", "Lion"],
            correctAnswer: 2
            }, {
            question: "What continent is the African Wild Dog native to ?",
            choices: ["Asia", "Europe", "USA", "Africa"],
            correctAnswer: 3
            }, {
            question: "Why do wolves howl ?",
            choices: ["To entice mates", "To confuse prey", "To communicate long distance", "All of the above"],
            correctAnswer: 2
        }];

        var counter = 0,
            correctAnswers = 0,
            $card = $('.m-card'),
            $quiz = $('<div class="m-quiz"></div>'),
            $btnNextQuestion = $('<button id="nextQuestion" class="m-btn" disabled>Next Question</button>');

        function init() {
            $card.on('click', '#startQuiz', loadQuiz);

            $card.on('click', 'a.m-quiz__answer', selectAnswer);

            $card.on('click', '#nextQuestion', function () {
                checkUserAnswer();
                counter++;
                if (counter > allQuestions.length - 1) {
                    var score = getUserScore();
                    showResults(score);
                    return;
                }
                changeQuestion();
                disableButton($(this));
            });
            
            $card.on('click', '#restartQuiz', function() {
               location.reload(); 
            });
        }

        function loadQuiz(event) {
            event.preventDefault();
            $card.empty().append($quiz).append('<div class="m-text--left"></div>').find('.m-text--left').append($btnNextQuestion);
            changeQuestion();
        }

        function changeQuestion() {
            $quiz.empty().prepend('<h2>' + allQuestions[counter].question + '</h2>').append('<ul class="m-quiz__list"></ul>');
            $.each(allQuestions[counter].choices, function (index, value) {
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
            if (userAnswer === allQuestions[counter].choices[allQuestions[counter].correctAnswer]) {
                correctAnswers++;
            }
        }

        function getUserScore() {
            return ((correctAnswers * 100) / allQuestions.length).toFixed();
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

    Quiz.init();

});