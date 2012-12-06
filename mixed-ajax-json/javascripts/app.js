;
(function($, window, undefined) {
	"use strict";

	var $doc = $(document), Modernizr = window.Modernizr;
	
	function updateMeta(meta) {
		$("meta[property=\"og:title\"]").attr("content", meta.title);
		$("meta[property=\"og:type\"]").attr("content", meta.type);
		$("meta[property=\"og:description\"]").attr("content", meta.description);
		$("meta[property=\"og:url\"]").attr("content", meta.url);
	}

	function renderFbButton(url) {
		var html = '<div  class="fb-like" data-href="';
		html += url;
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
		var pageName = location.pathname.split("/").pop();
		if (pageName == "albums") {
			$.ajax({
				url : "data/albums.json",
				success : function(data) {
					$(".main-link").html(data.title);
					$(".main-content").html(renderList(data));
					$("#facebook").html(renderFbButton(data.meta.url));
					updateMeta(data.meta);
					if (window.FB) FB.XFBML.parse($("#facebook").get(0));
				}
			});
		} else if (pageName == "singles") {
			$.ajax({
				url : "data/singles.json",
				success : function(data) {
					$(".main-link").html(data.title);
					$(".main-content").html(renderList(data));
					$("#facebook").html(renderFbButton(data.meta.url));
					updateMeta(data.meta);
					if (window.FB) FB.XFBML.parse($("#facebook").get(0));
				}
			});
		} else {
			$.ajax({
				url : "data/biography.json",
				success : function(data) {
					$(".main-link").html(data.title);
					$(".main-content").html(renderBiography(data));
					$("#facebook").html(renderFbButton(data.meta.url));
					updateMeta(data.meta);
					if (window.FB) FB.XFBML.parse($("#facebook").get(0));
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
		
		$(".side-nav").on("click", "a", function(event) {
			event.preventDefault();
			history.pushState(null, null, this.href);
			route();
		});
		$(window).on("popstate", route);
		
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
