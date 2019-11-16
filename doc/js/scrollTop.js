$(document).ready(function(){   
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.upToScroll').fadeIn();
        } else {
            $('.upToScroll').fadeOut();
        }
    });
    $('.upToScroll .scrollToTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});
