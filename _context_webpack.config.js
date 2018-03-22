/*******************

weback config
for static website

update : 201803

- webpack4 x sass
@link: https://ics.media/entry/17376
@link: https://gist.github.com/mburakerman/629783c16acf5e5f03de60528d3139af

- optimization.splitChunks
@link: https://qiita.com/soarflat/items/1b5aa7163c087a91877d
@link: http://webdesign-dackel.com/2015/09/10/webpack-multiple-output/

-autoprefixer
@link: https://blog.funxion.jp/314/

-webpack
@link: http://dackdive.hateblo.jp/entry/2016/05/07/183335
@link: http://dackdive.hateblo.jp/entry/2016/04/13/123000

*******************/



const webpack = require( 'webpack' ),
		path = require( 'path' ),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		MODE = 'development',
		enabledSourceMap = ( MODE === 'development' ),
		PATHS = {
			dir: {
				output: 'assets'
			},
			devServer: {
				contentBase: 'dist' 
			},
			output:{
				path: path.resolve(__dirname,'dist2')
			}
		};
const 	CopyWebpackPlugin = require('copy-webpack-plugin');		

module.exports = [{	

		context: path.resolve(__dirname, './src'),

		/**
		* mode
		* v4 / developmentだとsource mapも有効化
		*/
		mode: MODE,

		devtool: 'source-map',

		/**
		* entry point
		* v4 / エントリーポイントを指定しなければ自動的に「src/index.js」がエントリーポイントに
		*/
		entry: {
			'bundle' : path.resolve(__dirname, './src/main.js'),
			'top' : path.resolve(__dirname, './src/js/top.js'),
			'page' : path.resolve(__dirname, './src/js/page.js'),
		},


		/**
		*
		*/
		output: {
			path: PATHS.output.path,
			// publicPath: '/dist',		
			// publicPath: '/',
			filename: 'assets/js/[name].js'
		},		


		/**
		*ファイル変換
		*loaderは右から左に適用
		* v3 module.loaders -> v4 module.rules
		* v3 / loader -> css-loader!sass-loader
		* v4 / use -> use: [ 'css-loader',{loader:'sass-loader', options:{ ~~ }}] 
		*/	
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{
							loader: 'babel-loader',
				            options: {
				              presets: [
				                // env を指定することで、ES2017 を ES5 に変換。
				                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
				                // webpack の Tree Shaking 機能が使えない
				                ['env', {'modules': false}],
				                 'es2015'
				              ]}
				          }]
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						// publicPath: '../',
						use: [
							{
								loader: 'css-loader',
								options: {
									url: true,
									minimize: true,
									sourceMap: enabledSourceMap,
									// Sass+PostCSSの場合は2を指定
								     importLoaders: 2
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									plugins: ( loader ) => [ require('autoprefixer') ],
									sourceMap: enabledSourceMap								
								}
							},
							{
								loader: 'sass-loader',
								options:{
									sourceMap: enabledSourceMap,
									minimize: true								
								}
							}
						]
					})
				},
				{
					test: /\.ejs$/,
					exclude: /node_modules/,
					use: [
							{
								loader: 'html-loader'
							},						
							{
								loader:'ejs-html-loader',
								options: {
									title: 'The Ant: An Introduction',
									season: 1,
									episode: 9,
									production:enabledSourceMap
								}
							}
						]
				},
				{
					/**
					*file-loaderはファイルをバンドルせずに外部ファイルの参照を保つためのローダー
					*/
					test: /\.(eot|woff|ttf)$/,
					exclude: /node_modules\/^(slick-carousel)/,
					use: {
						loader:'file-loader',
						options: {
							publicPath: '../',
							// context: 'src',
							useRelativePath: true,							
		                    name: '[name].[ext]'
						}
					}
				},	
				{
					test: /\.(gif|png|jpg|svg|ico)$/,
					exclude: /node_modules\/^(slick-carousel)/,
					use: {
						loader:'file-loader',
						options: {
							publicPath: '../',
							// context: 'src',
							useRelativePath: true,
		                    name: '[name].[ext]'
						}
					}
				},					
				// {
				//	/**
				//	*url-loaderはCSS中で使用するアセットをBase64エンコードしたdata URIとしてバンドルできるようにします。
				//	* options.limitより大きい場合は外部参照でディレクトリをコピー
				//	*/
				// 	test: /\.(eot|woff|ttf|svg|css)$/,
				// 	use: 'url-loader',
				// 	// options: {
				// 	// 	limit: 8192,
	   			//  //  name: './img/[name].[ext]'
				// 	// }
				// },								
				// {
				// 	test: /\.html$/,
				// 	use: {
				// 		loader: 'html-loader'
				// 	}
				// }
			]
		},

		/**
		* webpack 4 ~ CommonChunksPlugin
		*/
		optimization: {
			splitChunks:{
				// name: 'bundle',
				// chunks: 'async'
		      // cacheGroups内にバンドルの設定を複数記述できる
		      cacheGroups: {
		        bundle: {
		          // node_modules配下のモジュールをバンドル対象とする
		          test: /node_modules/,
		          name: 'bundle',
		          chunks: 'async',
		        }
		      }				
			}
		},

	    plugins: [
	        new ExtractTextPlugin({
			   filename: PATHS.dir.output + '/css/main.css',
			   allChunks: true
			}),
		    new CopyWebpackPlugin([{
		      from: './img/',
		      to: PATHS.dir.output + '/img'
		    }]),			
	        new HtmlWebpackPlugin({ 
				filename: 'index.html',
				// favicon: './img/common/favicon.ico',
				template: './ejs/index.ejs',
				// inject: 'head',
				excludeChunks: /page/
			}),
	        new HtmlWebpackPlugin({ 
				filename: 'about/index.html',
				// favicon: 'img/common/favicon.ico',
				template: './ejs/about/index.ejs',
				// inject: 'head'
			}),
			new HtmlWebpackPlugin({ 
				filename: 'topics/index.html',
				// favicon: 'img/common/favicon.ico',
				template: './ejs/topics/index.ejs',
				// inject: 'head'
			}),
			new HtmlWebpackPlugin({ 
				filename: 'contact/index.html',
				// favicon: 'img/common/favicon.ico',
				template: './ejs/contact/index.ejs',
				// inject: 'head'
			}),						
	    ],

		resolve: {
			extensions: ['.js', '.jsx', '.css', '.scss'],
			alias: {
				slick: path.resolve( __dirname, 'node_modules/slick-carousel/slick/') 
			}
		},	

		devServer: {
			contentBase: PATHS.devServer.contentBase, //ここをルートとしてサーブ
			hot: true,
			inline: true,
			open: true,
			port: 3000,
			host: "0.0.0.0"		
		},
	}
];