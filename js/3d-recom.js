
var maxIndex = $('.carousel3d > li.carousel__item').length - 1;
var frontIndexItemId = $('.pos__front').attr('id');
var frontIndex = parseInt(frontIndexItemId.substring(frontIndexItemId.length - 1, frontIndexItemId.length));

// Get item index to the left of the input index
function getLeftIndex(index) {
	if (index === 0) {
		return maxIndex;
	} else {
		var result = index - 1;
		return result;
	}
}

// Get item index to the right of the input index
function getRightIndex(index) {
	if (index === maxIndex) {
		return 0;
	} else {
		var result = index + 1;
		return result;
	}
}

/**
* Spin Carousel by direction
* [direction] : "left-to-right" / "right-to-left"
**/
function spin(direction) {
	// Get initial position of items relative to front item
	var leftItem = $('#carousel__item-' + getLeftIndex(frontIndex) + '');
	var rightItem = $('#carousel__item-' + getRightIndex(frontIndex) + '');
	var frontItem = $('#carousel__item-' + frontIndex + '');

	// Spin left to right
	if (direction === 'left-to-right') {
		var nextItem = $('#carousel__item-' + getLeftIndex(getLeftIndex(frontIndex)) + '');
		leftItem.removeClass("pos__left").addClass('pos__front');
		frontItem.removeClass("pos__front").addClass("pos__right");
		rightItem.removeClass("pos__right").addClass("pos__back");
		nextItem.removeClass("pos__back").addClass("pos__left");
		frontIndex--;

	// Spin right to left
	} else if (direction === 'right-to-left') {
		var nextItem = $('#carousel__item-' + getRightIndex(getRightIndex(frontIndex)) + '');
		leftItem.removeClass("pos__left").addClass('pos__back');
		frontItem.removeClass("pos__front").addClass('pos__left');
		rightItem.removeClass("pos__right").addClass('pos__front');
		nextItem.removeClass("pos__back").addClass("pos__right");
		frontIndex++;
	}

	if (frontIndex > maxIndex) {
		frontIndex = 0;
	} else if (frontIndex < 0) {
		frontIndex = maxIndex;
	}
}

// Bind event on items click and swipe
$('li.carousel__item').on({
	click: function() {
		if($(this).attr('class') === 'carousel__item pos__left') {
			spin('left-to-right');
		} else if ($(this).attr('class') === 'carousel__item pos__right') {
			spin('right-to-left');
		}
	},
	swipeleft: function() {
		spin('right-to-left');
	},
	swiperight: function() {
		spin('left-to-right');
	},
	dragstart: function() { // Disable image draging on desktop
		return false;
	}
});
