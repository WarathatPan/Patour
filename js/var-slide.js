var slideWrap = $(".slideWrap")
		, slide = slideWrap.children(".var-slide")
		, gnb = $(".gnb")
		, indicator = gnb.children(".ind")
		, anispeed = 0.4
		, idx = 0
		, maxIdx = slide.size() - 1
		, animating = false;

	//EventListenerCrossBrowsing
	if (content.addEventListener) {
		// IE9, Chrome, Safari, Opera
		content.addEventListener("mousewheel", MouseWheelHandler, false);
		// Firefox
		content.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	}
	// IE 6/7/8
	else content.attachEvent("onmousewheel", MouseWheelHandler);

	//mouse-wheel accessibility
	function MouseWheelHandler(e) {
		var slideWrap = $(".slideWrap")
			, currentIdx = $(".active").index()
			// cross-browser wheel delta
			, e = window.event || e // old IE support
		 	, delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

		//change slideSpeed according to ind diff
		if ( delta == 1 ){
			backIdx();
		}
		//scrolldown
		if ( delta == -1 ){
			nextIdx();
		}
		slideSpeed = Math.abs( currentIdx - idx ) / 2 ;
		slideMotion();
		return false;
	}

	//arrow-key accessibility
	document.onkeydown = checkKey;
	function checkKey(e) {
	    e = e || window.event;
	    var currentIdx = $(".active").index();

	    if (e.keyCode == '38') {
	        // up arrow
	        backIdx();
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	       nextIdx();
	    }
		slideSpeed = Math.abs( currentIdx - idx ) / 2 ;
	    slideMotion();
	}

	//indicator interaction
	indicator.each(function(i){
		$(this).on({
			click : function(){
				idx = i
				//change slideSpeed according to ind diff
				var currentIdx = $(".active").index();
				slideSpeed = Math.abs( currentIdx - idx ) / 2
				slideMotion();
			}
		});
	});

	//idx ----
	function backIdx(){
		if ( !animating ){
			if ( idx == 0 ){
				idx = maxIdx;
			} else {
				idx = idx - 1
			}
		}
	}
	//idx ++++
	function nextIdx(){
		if ( !animating ){
	        if ( idx == maxIdx ){
				idx = 0;
			} else {
				idx = idx + 1;
			}
		}
	}
	//indicator set
	TweenMax.set(indicator.eq(0), { scale:1.4});
	//slideMotion
	function slideMotion(){
		//indicator
		if ( !animating ){
			animating = true;
			indicator.removeClass("active");
			indicator.eq(idx).addClass("active");
			TweenMax.to(indicator, anispeed,{ scale :1, ease : Power2.easeOut});
			TweenMax.to(indicator.eq(idx), anispeed,{ scale :1.4, ease : Power4.easeOut});
			//slide and slideWrap
			TweenMax.to(slideWrap, slideSpeed,{ top: - idx * 100 +"%", ease : Sine.easeOut, onComplete : function(){
				slide.removeClass("active");
				slide.eq(idx).addClass("active");
				animating = false;
			}});
		}
	}
