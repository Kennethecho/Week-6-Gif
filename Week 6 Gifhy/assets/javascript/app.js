var uss = ["Kansas", "Colorado", "California", "Chicago", "Missouri", "Washington"];

createUsButtons();

$('#addUs').on('click', function() {
    var usEntered = $('#usInput').val().trim();
    uss.push(usEntered);
    $('#usInput').val('');
    createUsButtons();

    return false;
});


$(document.body).on('click', '.button-list', function() {
    var usClicked = $(this).data('us');
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + usClicked + '&limit=10&api_key=dc6zaTOxFJmzC';


    $('#uss').empty();


    $.ajax({
        url: query,
        method: 'GET'

    }).done(function(response) {
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;
        for (i = 0; i < results.length; i++) {
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
            p.addClass('text-center');
            var img = $('<img>');


            img.attr('src', results[i].images.fixed_height_small_still.url);
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            img.attr('data-clicked', 'still');
            img.addClass('gif-margin gif center-block panel');

            newGif.append(p);
            newGif.append(img);

            $('#uss').append(newGif);
        }
    });
});


$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});


//
// FUNCTIONS --------------------------------------------------------------------------------------------------------------
//


function createUsButtons() {
    $('#usButtons').empty();

    for (var i = 0; i < uss.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-us', uss[i]).html(uss[i]);
        $('#usButtons').append(button);
    }
}
