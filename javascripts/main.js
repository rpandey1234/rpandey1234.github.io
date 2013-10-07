$( document ).ready(function() {
	var $root = $('html, body');
	$('a').click(function() {
	    var href = $.attr(this, 'href')
	    var nameHref = '[name="' + href.substr(1) + '"]';	    
	    $root.animate({
	        scrollTop: $(nameHref).offset().top
	    }, 500, function () {
	        window.location.hash = href;
	    });
	    return false;
	});
});