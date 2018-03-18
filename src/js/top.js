import $ from 'jquery';
import 'slick-carousel';
import { getScrollVal, $w } from './common.js';
// import 'slick/slick.scss';


var effefcts = () => {
	let $navPanels = $( '.section-navPanel' ).find( '.navPanel__panel' );
	let f = function( $scrollVal ){
		$.each( $navPanels, function(){
			let $target = $( this );

			if( $target.offset().top < $scrollVal + $w.height() - 20 ){
				$target.addClass( 'fadeIn' );
			}
		})
	};

	getScrollVal( f ) ;

}

export default function(){
	effefcts();
}