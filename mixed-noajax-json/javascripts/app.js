;
(function($, window, undefined) {
	"use strict";

	var $doc = $(document), Modernizr = window.Modernizr;

	var albums = {
		"title" : "Albums",
		"list" : [ {
			"year" : "2002",
			"content" : "Jenifer"
		}, {
			"year" : "2004",
			"content" : "Le Passage"
		}, {
			"year" : "2007",
			"content" : "Lunatique"
		}, {
			"year" : "2010",
			"content" : "Appelle-moi Jen"
		}, {
			"year" : "2022",
			"content" : "L'Amour et Moi"
		} ],
        "meta" : {
            "type" : "album",
            "title": "Jenifer's Discography",
            "description" : "The complete discography of Jenifer : 2002 Jenifer, 2004 Le Passage [...]"
    }
	};

	var singles = {
		"title" : "Singles",
		"list" : [ {
			"year" : "2002",
			"content" : "Destiné"
		}, {
			"year" : "2002",
			"content" : "Gimme! Gimme! Gimme! (A Man After Midnight)"
		}, {
			"year" : "2002",
			"content" : "J'attends l'amour"
		}, {
			"year" : "2002",
			"content" : "Au soleil"
		}, {
			"year" : "2002",
			"content" : "Des mots qui résonnent!"
		}, {
			"year" : "2003",
			"content" : "Donne-moi le temps"
		}, {
			"year" : "2004",
			"content" : "Ma révolution"
		}, {
			"year" : "2004",
			"content" : "Le souvenir de ce jour"
		}, {
			"year" : "2005",
			"content" : "C'est de l'or"
		}, {
			"year" : "2005",
			"content" : "Serre-moi"
		}, {
			"year" : "2007",
			"content" : "Tourner ma page"
		}, {
			"year" : "2008",
			"content" : "Comme un hic"
		}, {
			"year" : "2008",
			"content" : "Si c'est une île"
		}, {
			"year" : "2010",
			"content" : "Je danse"
		}, {
			"year" : "2011",
			"content" : "L'envers du paradis"
		}, {
			"year" : "2011",
			"content" : "L'amour fou"
		}, {
			"year" : "2012",
			"content" : "Sur le fil"
		} ],
        "meta" : {
            "type" : "song",
            "title": "Jenifer's Singles",
            "description" : "The complete singles list of Jenifer: 2002 Destiné, 2003 Donne-moi le temps [...]"
    }
	};

	var biography = {
		"title" : "Biography",
		"writtenBy" : "Written by Bob Smith on November 16, 2012",
		"image" : "images/jenifer.jpg",
		"paragraphs" : [
				"Jenifer, born as Jenifer Yaël Dadouche-Bartoli the 15th of November 1982 in Nice, is a pop singer revelead by the French television show Star Academy France in 2002. She got a certain success with a number of hit singles in the French, Belgium and Swiss charts.",
				"Just after her victory, she released a first single \"J'attends L'amour\", which encountered a real success. And a few later, followed a road tour as a solo artist from October 2002 until January 2003. During this road tour she performed at the Paris Olympia, one of his dream child.",
				"Her first album, entitled Jenifer, written by Marc Lavoine, sold over three quarters of a million copies. Re-released later to include two two new tracks: \"Entre Humains\" and \"Des Mots Qui Résonnent\", this new version sold aver a million copies." ],
        "meta" : {
            "type" : "musician",
            "title": "Jenifer's Biography",
            "description" : "The complet biography of Jenifer. Jenifer, born as Jenifer Yaël Dadouche-Bartoli the 15th of November 1982 in Nice, is a pop singer[...]"
    }
	};

	function updateMeta(meta) {
        $("meta[property=\"og:title\"]").attr("content", meta.title);
        $("meta[property=\"og:type\"]").attr("content", meta.type);
        $("meta[property=\"og:description\"]").attr("content", meta.description);
        $("meta[property=\"og:url\"]").attr("content", location.href);
    }

    function renderFbButton() {
        var html = '<div  class="fb-like" data-href="';
        html += location.href;
        html += '" data-send="false" data-width="450" data-show-faces="false" data-layout="button_count"></div>';
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
		if (pageName == "albums") {
			$(".main-link").html(albums.title);
			$(".main-content").html(renderList(albums));
            $("#facebook").html(renderFbButton());
            updateMeta(albums.meta);
            if (window.FB) FB.XFBML.parse($("#facebook").get(0));
		} else if (pageName == "singles") {
			$(".main-link").html(singles.title);
			$(".main-content").html(renderList(singles));
            $("#facebook").html(renderFbButton());
            updateMeta(singles.meta);
            if (window.FB) FB.XFBML.parse($("#facebook").get(0));
		} else {
			$(".main-link").html(biography.title);
			$(".main-content").html(renderBiography(biography));
            $("#facebook").html(renderFbButton());
            updateMeta(biography.meta);
            if (window.FB) FB.XFBML.parse($("#facebook").get(0));
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
