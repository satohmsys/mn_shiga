/*******************


*******************/

const merge = require('webpack-merge');
const baseConfig = require('./s_base_webpack.config.js');



module.exports = function( env ){
	console.log( 'MODE ------ ', env, ' ------' ); //コンソール出る
	const FILE = require( './s_' + env + '_webpack.config.js' );
	
	return merge( baseConfig, FILE );

};
