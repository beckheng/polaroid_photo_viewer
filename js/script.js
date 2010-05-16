/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
* Amended By:	 Beckheng Lam (bi.ken.lam@gmail.com)
*/
$(function()
{
	// added by beckheng
	var parentPosition = $(".polaroid").parent().position();
	var parentLeft = parentPosition.left;
	var parentTop = parentPosition.top;
	var parentInnerWidth = $(".polaroid").parent().innerWidth();
	var parentInnerHeight = $(".polaroid").parent().innerHeight();
	
	if (0 == parentInnerHeight)
	{
		if(window.innerWidth == undefined) { 
			parentInnerHeight = document.documentElement.clientHeight;
		} else {
			parentInnerHeight = window.innerHeight;	
		}
	}
	if (0 == parentInnerWidth)
	{
		if(window.innerWidth == undefined) { 
			parentInnerWidth = document.documentElement.clientWidth;
		} else {
			parentInnerWidth = window.innerWidth;
		}
	}
	// added by beckheng
	
	// When everything has loaded, place all polaroids on a random position	
	$(".polaroid").each(function (i) {
		var tempVal = Math.round(Math.random());
		if(tempVal == 1) {
			var rotDegrees = randomXToY(330, 360); // rotate left
		} else {
			var rotDegrees = randomXToY(0, 30); // rotate right
		}
		
		var newLeft = parentLeft + Math.random()*(parentInnerWidth - $(this).innerWidth());
		var newTop = parentTop + Math.random()*(parentInnerHeight - $(this).innerHeight());		
		
		var cssObj = { 'left' : newLeft,
			'top' : newTop,
			'-webkit-transform' : 'rotate('+ rotDegrees +'deg)',  // safari only
			'tranform' : 'rotate('+ rotDegrees +'deg)' }; // added in case CSS3 is standard
		$(this).css(cssObj);
	});
	
	// Set the Z-Index (used to display images on top while dragging)
	var zindexnr = 1;
	
	// boolean to check if the user is dragging
	var dragging = false;
	
	// Show the polaroid on top when clicked on
	$(".polaroid").mouseup(function(e){
		if(!dragging) {
			// Bring polaroid to the foreground
			zindexnr++;
			var cssObj = { 'z-index' : zindexnr,
			'transform' : 'rotate(0deg)',	 // added in case CSS3 is standard
			'-webkit-transform' : 'rotate(0deg)' };  // safari only
			$(this).css(cssObj);
		}
	});
	
	// Make the polaroid draggable & display a shadow when dragging
	$(".polaroid").draggable({
		cursor: 'crosshair',
		start: function(event, ui) {
			dragging = true;
			zindexnr++;
			var cssObj = { 'box-shadow' : '#888 5px 10px 10px', // added in case CSS3 is standard
				'-webkit-box-shadow' : '#888 5px 10px 10px', // safari only
				'margin-left' : '-10px',
				'margin-top' : '-10px',
				'z-index' : zindexnr };
			$(this).css(cssObj);
		},
		stop: function(event, ui) {
			var tempVal = Math.round(Math.random());
			if(tempVal == 1) {
				var rotDegrees = randomXToY(330, 360); // rotate left
			} else {
				var rotDegrees = randomXToY(0, 30); // rotate right
			}
			var cssObj = { 'box-shadow' : '', // added in case CSS3 is standard
				'-webkit-box-shadow' : '', // safari only
				'transform' : 'rotate('+ rotDegrees +'deg)', // added in case CSS3 is standard
				'-webkit-transform' : 'rotate('+ rotDegrees +'deg)', // safari only
				'margin-left' : '0px',
				'margin-top' : '0px' };
			$(this).css(cssObj);
			dragging = false;
		}
	});
	
	// Function to get random number upto m
	// http://roshanbh.com.np/2008/09/get-random-number-range-two-numbers-javascript.html
	function randomXToY(minVal,maxVal,floatVal) {
		var randVal = minVal+(Math.random()*(maxVal-minVal));
		return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
	}
	
});