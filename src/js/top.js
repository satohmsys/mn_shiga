import $ from 'jquery';
import 'slick-carousel';
import { getScrollVal, $w } from './common.js';
// import 'slick/slick.scss';


var effefcts = () => {
	$( function(){
		
		let $navPanels = $( '.section-navPanel' ).find( '.navPanel__panel' ),
			$mainvisualArea = $('.mainvisual');
		
		let f = function( $scrollVal ){
			const $scrollBottom = $scrollVal + $w.height();



			/**
			* panel navigation area
			*/
			$.each( $navPanels, function(){
				let $target = $( this );

				if( $target.offset().top < $scrollBottom - 20 ){
					$target.addClass( 'fadeIn' );
				}
			});



			/**
			* mainvisual 40th num
			*/
			if( $mainvisualArea.offset().top < $scrollBottom ) {
				$mainvisualArea.addClass( 'fadeIn' );
			}


			/**
			* parallax
			*/
			let $locationArea = $( '.section-navPanel__location' );

			if( $locationArea.offset().top < $scrollBottom + 30 &&
				 $scrollVal < ($locationArea.offset().top + $locationArea.outerHeight()) ){
				let bgpY = 100 - $scrollVal *0.05;
				$locationArea.css({
					'background-position': '0 ' + bgpY + '%'
				});
			}

		};

		getScrollVal( f ) ;


		/**
		* slick
		*/
		$( '.mainvisual__images' ).slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 0,
			dots: false,
			fade: true,
			infinite: true,
			slideToShow: 1,
			slideToScroll: 1,
			speed: 8000
		});
	})
}

export default function(){
	effefcts();
}