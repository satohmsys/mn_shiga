import $ from 'jquery';
import { getScrollVal, $w } from './common.js';


var effefcts = () => {
	$( function(){
		
		let $mainvisualArea = $('.mainvisual');
		
		let f = function( $scrollVal ){
			const $scrollBottom = $scrollVal + $w.height();

			/**
			* mainvisual 40th num
			*/
			if( $mainvisualArea.offset().top < $scrollBottom ) {
				$mainvisualArea.addClass( 'fadeIn' );
			}

		};

		getScrollVal( f ) ;

	})
}

export default function(){
	effefcts();
}


effefcts();