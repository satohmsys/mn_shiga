/*******************

weback config ( for development mode )
for static website

*******************/

require( 'babel-polyfill' );


const merge = require('webpack-merge');
const path = require( 'path' );
const baseConfig = require('./s_base_webpack.config.js');
const MODE = 'development';

let vars = require('./s_variables.js');


let devConfig = merge( baseConfig, {
		mode: MODE,
} );


module.exports = devConfig;
