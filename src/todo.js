// SEARCH


// LOG OUT


// DODAJ NOWĄ LISTĘ


// DODAJ NOWE ZADANIE
    // pokazuje ukryty div
$('.add-new-task').click(function() {
    $('.add-task').toggle("slide");
});
    // zmienia wskaźnik na palec (bez tego jest strzałka domyślna mimo cssa)
$('.add-new-task').hover(function() {
    $('.add-new-task').css( 'cursor', 'pointer' );
});
    // po kliknięciu na dowolny punkt poza "nowym zadaniem" div się ukrywa
$(".main").click(function (e) {
    $('.add-task').hide();
});


// NOWE ZADANIE - ZAPISZ
