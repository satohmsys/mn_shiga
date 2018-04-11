import $ from 'jquery';
import { getScrollVal, $w } from './common.js';


var effefcts = () => {
	$( function(){
		
		let $mainvisualArea = $('.mainvisual'),
			$mainvisualArea_copyEn = $('.mainvisual__textArea .en'),
			$sectionCulture = $( '.section--culture' ),
			$icon40th = $sectionCulture.find('.section--culture__40th');
		
		let f = function( $scrollVal ){
			const $scrollBottom = $scrollVal + $w.height();

			/**
			* section culture
			*/
			// if( $sectionCulture.offset().top < $scrollBottom  - 20  &&
			// 	 $scrollVal < ($sectionCulture.outerHeight() + $sectionCulture.offset().top ) ) {
			// 	let bgpY = 100 - $scrollVal *0.05;

			// 	$icon40th.css({
			// 		'filter': 'blur(' + bgpY*2 + 'px)',
			// 		'transform': 'translateY(' + bgpY + '%)'
			// 	})
			// }			
		};

		getScrollVal( f ) ;

	})
},
	moreView = () =>{
		let $toggle = $( '.moreView a');


		if( $toggle ){
			$toggle.on( 'click', function( e ){
				e.preventDefault();
				e.stopPropagation();

				$( this ).closest( '.aInfo' ).css( {
					'height': 'auto'
				}).find( $( this) ).remove();
			}) 
		}
	}

export default function(){
}

moreView();
// effefcts();