/*
 * jQuery Blink Tag Plugin
 *
 * Makes blink tags work in modern browsers!
 * You can give a <blink> tag an optional attribute "speed", which represents
 * the blink speed in milliseconds. This will also catch new <blink> elements
 * as they are added to the page!
 *
 * http://keithmcknight.net/
 * Copyright (c) 2012 Keith McKnight
 * Version: 1.0
 *
 * Dual licensed under the MIT and GPL licenses.
 */

(function($){

/**
 * Start blinking on the selector
 */
$.fn.blink = function () {
	var e = $( this );
	// Single Element
	if ( e.length === 1 )
	{
		var s = parseInt( e.attr( 'speed' ) ) || 500;
		clearInterval( e.data( 'interval' ) );
		e.data( 'interval', setInterval( function () {
			var v = e.css( 'visibility' );
			e.css( 'visibility', v !== 'hidden' ? 'hidden' : 'visible' );
		}, s ) );
	}
	// Multiple Elements
	else
	{
		e.each( function( i, o ) {
			$( o ).blink();
		} );
	}
	// Allow chaining
	return e;
};

/**
 * Stop blinking on the selector
 */
$.fn.blinkStop = function () {
	var e = $( this );
	// Single Element
	if ( e.length === 1 )
	{
		clearInterval( e.css( 'visibility', '' ).data( 'interval' ) );
	}
	// Multiple Elements
	else
	{
		e.each( function( i, o ) {
			$( o ).blinkStop();
		} );
	}
	// Allow chaining
	return e;
};

/**
 * Start all current and future <blink> tags
 */
$.startBlinkTags = function ()
{
	$( 'blink' ).blink();
	$( document ).bind( 'DOMNodeInserted', blinkNewNode );
}

/**
 * Stop all <blink> tags and stop listening for new ones
 */
$.stopBlinkTags = function ()
{
	$( 'blink' ).blinkStop();
	$( document ).unbind( 'DOMNodeInserted', blinkNewNode );
}

/**
 * Handler for DOMNodeInserted. Stat blinking if the new Node is a <blink> tag
 */
function blinkNewNode ( e )
{
	var t = $( e.target );
	if ( t.is( 'blink' ) )
		t.blink();
}

})(jQuery);