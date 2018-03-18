import $ from 'jquery';

let $w = $( window ),
	$flag = true;

/**
* スクロール値を取得する
*/
var getScrollVal = ( callback ) => {
	$( function(){
		$w.on( 'scroll load', function() {
			let $scrollVal = $w.scrollTop();
			// return $scrollVal;
			callback( $scrollVal );
		} );
	})
}

var backToTop = () => {
	$(function(){
		$('.pagetop').on( 'click', function( e ){
			e.preventDefault();
			e.stopPropagation();

			$( 'body,html' ).animate({
				scrollTop: 0
			}, '800', 'swing' );
		});
	});
}

var navToggle = () => {	
	$( function(){
		/**
		* sp button
		*/
		var $toggle = $( '.navToggle' ),
			$body = $( 'body' );

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
	});		
}

export {$w};
export {getScrollVal};
export default function(){
	navToggle();
	backToTop();
}