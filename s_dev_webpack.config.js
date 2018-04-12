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
		devtool: 'source-map',
		devServer: {
			contentBase: vars.PATHS.devServer.contentBase, //ここをルートとしてサーブ
			hot: true,
			inline: true,
			compress: true,
			open: true,
			port: 3000,
			host: "0.0.0.0"		
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
							publicPath: '/',	
							context: 'src',
		                    name: vars.PATHS.dir.output +　'/fonts/[name].[ext]'																			
		                    // name: vars.PATHS.dir.output +　'/[path][name].[ext]'
						}
					}
				},	
				{
					test: /\.(gif|png|jpg|svg|ico)$/,
					exclude: /node_modules\/^(slick-carousel)/,
					use: {
						loader:'file-loader',
						options: {
							publicPath: '/',
							context: 'src',
		                    name: vars.PATHS.dir.output +　'/[path][name].[ext]'
						}
					}
				}
			]
		},
} );


module.exports = devConfig;
