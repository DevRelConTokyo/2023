$(() => {
	const lang = navigator.language.split('-')[0];
	if (lang === 'ja') {
		$('.lang-ja').show();
		$('.lang-en').hide();
	} else {
		$('.lang-ja').hide();
		$('.lang-en').show();
	}
	$(window).scroll(function() {
		if ($(document).scrollTop() > 150) {
			$('.navbar').addClass('navbar-white');
		} else {
			$('.navbar').removeClass('navbar-white');
		}
	});
	$('a.scrollnav[href^="#"]').click(function(event) {
		var id = $(this).attr("href");
		var offset = 60;
		var target = $(id).offset().top - offset;
		$('html, body').animate({scrollTop:target}, 500);
		event.preventDefault();
	});
	$('a.js-link-scroll').on('shown.bs.tab', function (e) {
		$('#myTab .active').removeClass('active');
		$('a[href="'+$(this).attr('href')+'"]').addClass('active');
		var that = this;
		$('html, body').animate({
				scrollTop: $( $(that).attr('href') ).offset().top - 200
		}, 250);
	});
	$('.navbar-nav>li>a').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});
});
