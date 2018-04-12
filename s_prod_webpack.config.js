/*******************

weback config ( for production mode )
for static website

*******************/

const merge = require('webpack-merge');
const path = require( 'path' );
const baseConfig = require('./s_base_webpack.config.js');
const MODE = 'production';

let vars = require('./s_variables.js');

//setting
vars.PATHS.output.path = path.resolve(__dirname,'dist_wp');
vars.enabledSourceMap = false;
vars.MODE = MODE;


let prodConfig = merge( baseConfig, {
		mode: MODE,

		output: {
			path: vars.PATHS.output.path
		},			

		module: {
			rules: [
				{
					/**
					*file-loaderはファイルをバンドルせずに外部ファイルの参照を保つためのローダー
					*/
					test: /\.(eot|woff|ttf)$/,
					exclude: /node_modules\/^(slick-carousel)/,
					use: {
						loader:'file-loader',
						options: {
							context: 'src',
							publicPath: '/wp-content/themes/sumsortho18/',							
		                    name: vars.PATHS.dir.output +　'/fonts/[path][name].[ext]'
						}
					}
				},	
				{
					test: /\.(gif|png|jpg|svg|ico)$/,
					exclude: /node_modules\/^(slick-carousel)/,
					use: {
						loader:'file-loader',
						options: {
							context: 'src',
							publicPath: '/wp-content/themes/sumsortho18/',							
		                    name: vars.PATHS.dir.output +　'/[path][name].[ext]'
						}
					}
				},
			]
		}
} );


module.exports = prodConfig;
