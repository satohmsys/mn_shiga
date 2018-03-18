import $ from 'jquery';

let $w = $( window ),
	$body = $( 'body' ),
	$flag = true,
	$pageTop = $('.pagetop');

/**
* スクロール値を取得する
*/
var getScrollVal = ( callback ) => {
	$w.on( 'scroll load', function() {
		let $scrollVal = $w.scrollTop();
		// return $scrollVal;
		callback( $scrollVal );
	} );
}

var backToTop = () => {
	$pageTop.on( 'click', function( e ){
		e.preventDefault();
		e.stopPropagation();

		$( 'body,html' ).animate({
			scrollTop: 0
		}, '800', 'swing' );
	})
}

var navToggle = () => {
	/**
	* sp button
	*/
	let $toggle = $( '.navToggle' );

	$toggle.on( 'click', function(){
		$body.toggleClass( 'navOpen' );
	} );
	$w.on( 'resize', function(){
		if( $flag ){
			$flag = false;
			setTimeout(function(){
				if( 700 < $w.width() ){
					$body.removeClass( 'navOpen' );
				}
				$flag = true;
				return $flag;
			}, 500 );
		}
	});
}

export {$w};
export {getScrollVal};
export default function(){
	navToggle();
	backToTop();
}