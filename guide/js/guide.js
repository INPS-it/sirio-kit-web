var version='7.0.1';

// Sidenav
function openCollapse($this){
	id = $this.attr("href").replace("components","nav")
	$(id).slideToggle('slow');
	$this.toggleClass("guide-collapsed");
}
function closeCollapse($this){
	id = $this.attr("href").replace("components","nav")
	$(id).hide(0);
	$this.toggleClass("guide-collapsed");
}
$(document).on('click', '#guide-nav > li > a', function (e) {
	e.preventDefault();
	openCollapse($(this));
}); 
$(document).on('click', '.guide-nav.open #guide-nav li li a', function (e) {
	$(".guide-nav.open").removeClass("open");
}); 
$("#guide-nav > li > a").each(function() {
	if (window.location.pathname.indexOf($(this).attr("href").replace("#nav","")) < 0) {
		closeCollapse($(this));
	}
}); 

$(document).on('click', '.guide-section [href="#"]', function (e) {
	e.preventDefault();
});

$(document).ready(function() {

	// Version
	$('header small, footer small').html('ver '+version);


	// Scroll to top
	$(window).on("scroll", function(){
		if ($(this).scrollTop() >= 350) {
		  $("#guide-scroll-top").fadeIn(200);
		} else {
		  $("#guide-scroll-top").fadeOut(200);
		}
	});
	$(document).on('click', '#guide-scroll-top', function (e) {
		$("body,html").animate({
		  scrollTop : 0
		}, 500);
		e.preventDefault();
	}); 
	

	// Prevent link example
	$(document).on('click', 'a[href=""]', function (e) {
		e.preventDefault();
	});

	// highlight.js e clipboard.js
	$('div.code').each(function() {
		var id = $(this).attr("id");
		$(this).find("pre").each(function(i) {
			$(this).attr("id",id+"-"+i)
			$(this).before('<button class="btn btn-xs btn-copy" data-clipboard-action="copy" data-clipboard-target="#'+id+'-'+i+' code">Copia</button>');
		});
		$(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-'+id+'">Mostra il codice</a><div id="src-'+id+'" class="guide-collapse">'+$(this).html()+'</div>');
	});
	$(document).on('click', '[data-guide-toggle="collapse"]', function (e) {
		e.preventDefault();
		$(this).toggleClass("guide-collapsed")
		id = $(this).attr("href");
		$(id).slideToggle('slow');
	});

	$('pre xmp').each(function() {
		var data = $(this).html().toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
		$(this).replaceWith('<code>'+data+'</code>');
	});

	if ($('pre').length) {
		hljs.initHighlighting();
		var clipboard = new ClipboardJS('.btn-copy');

		clipboard.on('success', function(e) {
			e.clearSelection();
			alert('Codice copiato con successo!');
		});

		clipboard.on('error', function(e) {
			e.clearSelection();
			alert('Premi Ctrl+C per copiare il codice.');
		});
	}

});