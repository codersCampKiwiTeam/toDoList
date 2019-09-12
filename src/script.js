$('.form p a').click(function () {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow")
})

$('.form button').click(function () {
    $('.panel').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow")
})