import $ from 'jquery';

let $w = $( window ),
	$body = $( 'body' ),
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
			var $toggle = $( '.navToggle' );

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

var isLoaded = () => {

	let $loadingAnim = $( '.loadingAnim' );
	
	if( $loadingAnim ){
		$loadingAnim.on( 'transitionend', function(){
			$loadingAnim.remove();
		})
		$w.on( 'load', function(){
			$body.addClass( 'isLoaded' );
			// $( '.loadingAnim' ).fadeOut('fast', function(){
			// 	$(this).remove();
			// })
		});	
	}
}

export {$};
export {$w};
export {getScrollVal};
export default function(){
	navToggle();
	backToTop();
	commonScrollToggle();
	headExpand();
	isLoaded();
}