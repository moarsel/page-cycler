$(document).on("ready", function (e){
    var pages = [];

    var grabFirstPage = function () {
        var first = pages.shift();
        pages.push(first);
        return first;
    }

    var prompt_list = function () {
     var pasted_text = $("#pasted_text").val();
        if (pasted_text) {
            pages = pasted_text.split('\n');
            pages = pages.filter(Boolean);
            for (var i = pages.length - 1; i >= 0; i--) {
                pages[i] = $.trim(pages[i]);
                if (!pages[i].match(/^[a-zA-Z]+:\/\//)) {
                    pages[i] = 'http://' + pages[i];
                }
            };
            
            var f = grabFirstPage();
            var b = grabFirstPage();
            $('.front').attr('src', f);
            $('.back').attr('src', b);
            $('.front').addClass('active');
            $('.current').text($('.front').attr("src"));
            $('.mainpage').hide();
            $('.controls').show();
            $('.next').show();
        }
    }

    var next = function () {
        $('.front, .back').toggleClass('active inactive');
        $('.current').text($('.active').attr("src"));
        var load = grabFirstPage();
        $('.inactive').attr('src', load);
    }

    $('.start').on('click', function() {
    	prompt_list();
    });

    $('.next').on('click', function() {
      next();
    });

    $(".reset").on('click', function(){
        $('.mainpage').show();
        $('.active').removeClass('active')
    });
});