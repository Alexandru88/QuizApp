QUIZAPP.extend(QUIZAPP, 'Utils');

QUIZAPP.Utils = (function () {

    function getQuizQuestions() {
        var promise = $.Deferred();

        $.ajax('questions.json', {
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                promise.resolve(result);
            },
            error: function () {
                var error = 'There was an error.'
                promise.reject(error);
            }
        });

        return promise;
    }

    return {
        getQuizQuestions: getQuizQuestions
    }

})();