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

const 	webpack = require( 'webpack' ),
		path = require( 'path' ),
		ExtractTextPlugin = require('extract-text-webpack-plugin'),
		HtmlWebpackPlugin = require('html-webpack-plugin'),
		CopyWebpackPlugin = require('copy-webpack-plugin');		

let vars = require('./s_variables.js');		


let baseConfig = {	

		/**
		* entry point
		* v4 / エントリーポイントを指定しなければ自動的に「src/index.js」がエントリーポイントに
		*/
		entry: {
			'bundle' : path.resolve(__dirname, './src2/main.js'),
			'top' : path.resolve(__dirname, './src2/js/top.js'),
			'page' : path.resolve(__dirname, './src2/js/page.js'),
		},

		/**
		*
		*/
		output: {
			path: vars.PATHS.output.path,
			// publicPath: '../',		
			publicPath: '/',
			filename: vars.PATHS.dir.output +　'/js/[name].js'
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
									sourceMap: vars.enabledSourceMap,
									// Sass+PostCSSの場合は2を指定
								     importLoaders: 2
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									plugins: ( loader ) => [ require('autoprefixer') ],
									sourceMap: vars.enabledSourceMap								
								}
							},
							{
								loader: 'sass-loader',
								options:{
									sourceMap: vars.enabledSourceMap,
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
								loader:'ejs-html-loader'
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
							publicPath: '/',		
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
		                    name: vars.PATHS.dir.output +　'/[path][name].[ext]'
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
			// splitChunks: {
			//     chunks: "async",
			//     minSize: 30000,
			//     minChunks: 1,
			//     maxAsyncRequests: 5,
			//     maxInitialRequests: 3,
			//     name: true,
			//     cacheGroups: {
			//         default: {
			//             minChunks: 2,
			//             priority: -20,
			//             reuseExistingChunk: true
			//         },
			//         vendors: {
			//             test: /[\\/]node_modules[\\/]/,
			//             priority: -10
			//         }
			//     }
			// }			
			splitChunks:{			
				// name: 'bundle',
				// chunks: 'async'
		  //     cacheGroups内にバンドルの設定を複数記述できる
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
			   filename: vars.PATHS.dir.output + '/css/main.css',
			   allChunks: true
			}),
		    new CopyWebpackPlugin([{
		      from: './src2/assets/img/',
		      to: vars.PATHS.dir.output + '/img'
		    }]),			
	        new HtmlWebpackPlugin({ 
				filename: 'index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/index.ejs',
				// inject: 'head',
			}),
	        new HtmlWebpackPlugin({ 
				filename: 'about/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/about/index.ejs',
				// inject: 'head'
			}),
			new HtmlWebpackPlugin({ 
				filename: 'topics/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/topics/index.ejs',
				// inject: 'head'
			}),
			new HtmlWebpackPlugin({ 
				filename: 'contact/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/contact/index.ejs',
				// inject: 'head'
			}),		
			new HtmlWebpackPlugin({ 
				filename: 'kanja/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/kanja/index.ejs',
				// inject: 'head'
			}),
			new HtmlWebpackPlugin({ 
				filename: 'special/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/special/index.ejs',
				// inject: 'head'
			}),	
			new HtmlWebpackPlugin({ 
				filename: 'works/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/works/index.ejs',
				// inject: 'head'
			}),	
			new HtmlWebpackPlugin({ 
				filename: 'dosokai/index.html',
				// favicon: './src2/img/common/favicon.ico',
				template: './src2/ejs/dosokai/index.ejs',
				// inject: 'head'
			}),				
	    ],

		devServer: {
			contentBase: vars.PATHS.devServer.contentBase, //ここをルートとしてサーブ
			hot: true,
			inline: true,
			compress: true,
			open: true,
			port: 3000,
			host: "0.0.0.0"		
		},	    

		resolve: {
			extensions: ['.js', '.jsx', '.css', '.scss'],
			alias: {
				slick: path.resolve( __dirname, 'node_modules/slick-carousel/slick/') 
			}
		}
	};

module.exports = baseConfig;