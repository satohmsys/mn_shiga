import $ from 'jquery';

let $w = $( window ),
	$flag = true;

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
		$('.pagetop').on( 'click', function( e ){
			e.preventDefault();
			e.stopPropagation();

			$( 'body,html' ).animate({
				scrollTop: 0
			}, '800', 'swing' );
		});
}

var navToggle = () => {	
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
			console.log( $toggle );
}

var commonScrollToggle = () => {
		let f = ( $scrollVal ) =>{
			let $jsEffect = $('.js-effect'),
				$scrollBottom = $scrollVal + $w.height();

			/**
			* all fadein targets
			*/
			if( $jsEffect ){
				$.each( $jsEffect, function(){
					let $target = $( this );

					if( $target.offset().top < $scrollBottom - 50 ) {
						$target.addClass( '-on' );
					}

				});				
			}					
		}
		getScrollVal( f );
}

var headExpand = () => {
		let f = ( $scrollVal ) => {
			let $header = $('.siteHeader');

			300 < $scrollVal ? $header.addClass('-isScrolled') : $header.removeClass('-isScrolled') 
		}

		getScrollVal( f );
}

export {$w};
export {getScrollVal};
export default function(){
	navToggle();
	backToTop();
	commonScrollToggle();
	headExpand();
}