
$('#hub-search-form').on("submit", function(event) {
    event.preventDefault();
    var searchPhrase = $('#search-phrase').val();
    var stars = $('#search-stars').is(':checked'); // checkbox will return a boolean
    var language = $('#search-language').val();
    var githubSearch = "";

    if(searchPhrase) {
        $('.result-list').text('Searching...');
        githubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

        if(language != "All") {
            githubSearch += "+language:" + encodeURIComponent(language);
        } else {
            githubSearch += "+language:All"
        }
        if(stars) {
            githubSearch += "&sort=stars";
        }

        $.get(githubSearch).success(function(result) {
            displayResults(result.items);
        }).fail(function(error) {
            console.log('error');
        }).done(function(done) {
            console.log('done');
        });
    }
});

/* input on change */
var $input = $('.input-field');
var $inputFiller = $('.input');
$input.on('change', function() {
    if($input.val().length > 0) {
        $inputFiller.addClass('input-filled');
    } else {
        $inputFiller.removeClass('input-filled');
    }
});

/* populate our results container  */
function displayResults(results) {
    var $container = $('.result-list');
    $container.empty();
    $.each(results, function(i, item) {
        var $newResult = $("<div class='result'>" +
            "<div class='title'><a target='_blank' href='" + item.html_url + "'>" + item.name + "</a></div>" +
            "<div class='result-language'>Language: " + item.language + "</div>" +
            "<div class='result-owner'>Owner: " + item.owner.login + "</div>" +
            "<div class='result-stars'>Stars: " + item.stargazers_count + "</div>" +
            "</div>");
        $container.append($newResult);
    });
}