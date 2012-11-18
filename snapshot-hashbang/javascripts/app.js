;
(function($, window, undefined) {
	"use strict";

	var $doc = $(document), Modernizr = window.Modernizr;
	
	function renderMain() {
		var html = '<div class="row"><div class="twelve columns">';
		html += '<h1><small>Welcome to to the Nolwenn Leroy fanclub site!</small></h1><hr />';
		html += '</div></div><div class="row"><div class="nine columns" role="content">';
		html += '<article class="main-article"><h3><a class="main-link" href=""></a></h3><div class="main-content">';
		html += '</div></article></div><aside class="three columns">';
		html += '<ul class="side-nav"><li><a href="#!biography">Biography</a></li><li><a href="#!albums">Albums</a></li>';
		html += '<li><a href="#!singles">Singles</a></li></ul></aside></div>';
		html += '<footer class="row"><div class="twelve columns"><hr /><div class="row"><div class="six columns">';
		html += '</div><div class="six columns"></div></div></div></footer>';
		return html; 
	}
	
	function renderBiography(data) {
		var html = '<div class="row"><div class="six columns">';
		html += '<p>' + data.paragraphs[0] + '</p>';
		html += '<p>' + data.paragraphs[1] + '</p>';
		html += '</div><div class="six columns">';
		html += '<img src="' + data.image + '">';
		html += '</div></div>';
		html += '<p>' + data.paragraphs[2] + '</p>';
		return html;
	}
	
	function renderList(data) {
		var html = '<ul class="no-bullet">';
		$.each(data.list, function(index, item) {
			html += '<li><strong>' + item.year + '</strong> : ' + item.content + '</li>';
		});
		return html;
	}
	
	function route() {
		var pageName = location.hash.split("#!")[1];
		if (!pageName) {
			pageName = "biography";
		}
		if (pageName == "" || pageName == "biography") {
			$(".body").html(renderMain());
			$.ajax({
				url : "data/biography.json",
				success : function(data) {
					$(".main-link").html(data.title);
					$(".main-content").html(renderBiography(data));
				}
			});
		} else if (pageName == "albums") {
			$(".body").html(renderMain());
			$.ajax({
				url : "data/albums.json",
				success : function(data) {
					$(".main-link").html(data.title);
					$(".main-content").html(renderList(data));
				}
			});
		} else if (pageName == "singles") {
			$(".body").html(renderMain());
			$.ajax({
				url : "data/singles.json",
				success : function(data) {
					$(".main-link").html(data.title);
					$(".main-content").html(renderList(data));
				}
			});
		}
	}

	$(document).ready(function() {
		$.fn.foundationAlerts ? $doc.foundationAlerts() : null;
		$.fn.foundationButtons ? $doc.foundationButtons() : null;
		$.fn.foundationAccordion ? $doc.foundationAccordion() : null;
		$.fn.foundationNavigation ? $doc.foundationNavigation() : null;
		$.fn.foundationTopBar ? $doc.foundationTopBar() : null;
		$.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
		$.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
		$.fn.foundationTabs ? $doc.foundationTabs({
			callback : $.foundation.customForms.appendCustomMarkup
		}) : null;
		$.fn.foundationTooltips ? $doc.foundationTooltips() : null;
		$.fn.foundationMagellan ? $doc.foundationMagellan() : null;
		$.fn.foundationClearing ? $doc.foundationClearing() : null;

		$.fn.placeholder ? $("input, textarea").placeholder() : null;
		
		$(window).on("hashchange", route);
		
		route();
	});

	// UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
	// $(".block-grid.two-up>li:nth-child(2n+1)").css({clear: "both"});
	// $(".block-grid.three-up>li:nth-child(3n+1)").css({clear: "both"});
	// $(".block-grid.four-up>li:nth-child(4n+1)").css({clear: "both"});
	// $(".block-grid.five-up>li:nth-child(5n+1)").css({clear: "both"});

	// Hide address bar on mobile devices (except if #hash present, so we don"t mess up deep linking).
	if (Modernizr.touch && !window.location.hash) {
		$(window).load(function() {
			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
		});
	}	

})(jQuery, this);
