$(document).ready(function () {
    $('#searchBtn').click(function () {
        $('#results').empty();
        var input = $('#searchInput').val();
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&gsrsearch=" + input + "&format=json&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max",
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (data) {
                $('#home').removeClass('top-place');
                $('#results').removeClass('hide');
                for (pageid in data.query.pages) {
                    var newDiv = document.createElement('div');
                    var heading = document.createElement('h3');
                    var desc = document.createElement('p');
                    var anchor = document.createElement('a');
                    anchor.setAttribute("href", "https://en.wikipedia.org/?curid=" + pageid);
                    anchor.setAttribute("target", "blank");
                    var titleNode = document.createTextNode(data.query.pages[pageid].title);
                    var descNode = document.createTextNode(data.query.pages[pageid].extract);
                    $(heading).append(titleNode);
                    $(anchor).append(heading);
                    $(desc).append(descNode);
                    $(anchor).append(desc);
                    $(newDiv).append(anchor);
                    $(anchor).addClass('text');
                    $(newDiv).addClass('bg-light pt-1 px-1 m-4 rounded');
                    $('#results').append(newDiv);
                    $(newDiv).hover(function () {
                        $(this).toggleClass("hover bg-light");
                    })
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    $('#searchInput').keypress(function (e) {
        if (e.which == 13) {
            $('#searchBtn').click();
            e.preventDefault();
        }
    });
});




