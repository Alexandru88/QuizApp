$(function () {
    $('a.m-quiz__answer').on('click', function (event) {
        event.preventDefault();

        $('a.m-quiz__answer').removeClass('is-selected');
        $(this).addClass('is-selected');
        $('.m-btn[disabled]').attr('disabled', false);
    });
});