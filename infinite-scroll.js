$(function() {
	app.init();
})

var app={};
	app.setScrollTimeout = function() { app.scrollTimeout = setInterval(app.scrollListener, 1); }
	app.scrollSubject = null;
	app.getScrollSubject = function() {
		var collection = document.getElementsByClassName("scroller");
		app.scrollSubject = collection[0];
	}
	app.scrollListener = function() {
		var pos = app.scrollSubject.scrollTop,
		scrollHeight = app.scrollSubject.scrollHeight,
		containerHeight = app.scrollSubject.offsetHeight;
		gap = 50;
		if(pos+gap+containerHeight >= scrollHeight) {
			app.scrollSubject.dispatchEvent(app.events.atBottom);
		}
		if(pos-gap<=0) { 
			app.scrollSubject.dispatchEvent(app.events.atTop);
		};
	}
	app.makeBlank = function(what) {
		var h 		= $(what).height(),
			w 		= $(what).width(),
			$div 	= $("<div/>");
		$div.height(h);
		$div.width(w);
		$div.addClass("blank");
		return $div;
	}
	app.init = function() {
		app.getScrollSubject();
		app.setScrollTimeout();
		app.scrollSubject.addEventListener("scrollAtBottom", app.handlers.atBottom, false)
		app.scrollSubject.addEventListener("scrollAtTop", app.handlers.atTop, false)
	}
	app.events={};
	app.events.atBottom = new CustomEvent(
		"scrollAtBottom",
		{ bubbles: false,
		  cancelable: false }
	);
	app.events.atTop = new CustomEvent(
		"scrollAtTop",
		{ bubbles: false,
		  cancelable: false }
	);
	app.handlers={};
	app.handlers.atBottom = function() {
		var first = document.getElementsByClassName("first");
		var $blank = app.makeBlank(first[0]);
		$(".first").wrap($blank);
		$(".blank > *").removeClass("first").appendTo(app.scrollSubject);
		$(".block").eq(0).addClass("first")

	}
	app.handlers.atTop = function() {
		
	}
