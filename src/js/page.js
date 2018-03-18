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
			if( $sectionCulture.offset().top < $scrollBottom  - 20  &&
				 $scrollBottom < ($sectionCulture.outerHeight() + $sectionCulture.offset().top ) ) {
				let bgpY = 100 - $scrollVal *0.05;

				$icon40th.css({
					'filter': 'blur(' + bgpY*1.85 + 'px)',
					'transform': 'translate(' + bgpY/10 + '%, ' + bgpY + '%)'
				})
			}			
		};

		getScrollVal( f ) ;

	})
}

export default function(){
	effefcts();
}


effefcts();