;
(function($, window, undefined) {
	"use strict";

	var $doc = $(document), Modernizr = window.Modernizr;

	var albums = {
		"title" : "Albums",
		"list" : [ {
			"year" : "2002",
			"content" : "Temps mort"
		} ]
	};

	var singles = {
		"title" : "Singles",
		"list" : [ {
			"year" : "2002",
			"content" : "Destinée (feat. Kayna Samet)"
		} ]
	};

	var biography = {
		"title" : "Biography",
		"writtenBy" : "Written by Bob Smith on November 16, 2012",
		"image" : "images/booba.jpg",
		"paragraphs" : [
				"Booba was born Elie Yaffa on December 9, 1976 in the French city of Boulogne-Billancourt. He was born in Paris and started his music career in a duo called \"Lunatic\" with Ali, another Parisian rapper. Booba is revered for the quality of his flow and beats but is also very controversial for the \"gangsta\" style.",
				"In 2002, Booba released his first solo album entitled \"Temps mort\". Then he released three further albums: \"Pantheon\", \"Ouest Side\", \"0.9\", \"Lunatic\" (with the same name as his former crew) and \"Futur\"",
				"Booba was heavily influenced by the scene(stage) hip-hop American of on 1980s and at the beginning of on 1990s. The dark melodies accompanied with raw texts, faithful to the rap of New York, are present on every album of Booba. He has a clothing line \"Ünkut\" and has had training in the sport of boxing." ]
	};

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
		if (pageName == "biography") {
			$(".main-link").html(biography.title);
			$(".main-content").html(renderBiography(biography));			
		} else if (pageName == "albums") {
			$(".main-link").html(albums.title);
			$(".main-content").html(renderList(albums));
		} else if (pageName == "singles") {
			$(".main-link").html(singles.title);
			$(".main-content").html(renderList(singles));
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
