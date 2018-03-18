/*******************

weback config
for static website

update : 201803

-webpack4 x sass
@link: https://ics.media/entry/17376
@link: https://gist.github.com/mburakerman/629783c16acf5e5f03de60528d3139af

- optimization.splitChunks
@link:https://qiita.com/soarflat/items/1b5aa7163c087a91877d

-autoprefixer
@link: https://blog.funxion.jp/314/

-webpack
@link: http://dackdive.hateblo.jp/entry/2016/05/07/183335
@link: http://dackdive.hateblo.jp/entry/2016/04/13/123000
@link: https://qiita.com/one-kelvin/items/b810aafb6b5ef90789a3
-sass
@link: http://kinosuke.hatenablog.jp/entry/2017/08/02/100051

*******************/

const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODE = 'development';
const enabledSourceMap = ( MODE === 'development' );



module.exports = [{
		/**
		* mode
		* v4 / developmentだとsource mapも有効化
		*/
		mode: MODE,

		devServer: {
			contentBase: 'dist', //ここをルートとしてサーブ
			hot: true,
			inline: true,
			open: true,
			port: 3000,
			host: "0.0.0.0"		
		},


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
					// use: extractPlugin.extract({
					// 	fallback: 'style-loader',
					// 	use: [
					// 		{
					// 			loader: 'css-loader',
					// 			options: {
					// 				url: false,
					// 				sourceMap: enabledSourceMap,
					// 				importLoaders: 2,

					// 			}
					// 		},
					// 		{
					// 			loader: 'postcss-loader',
					// 			options: {
					// 				plugins: ( loader ) => [ require('autoprefixer') ],
					// 				sourceMap: enabledSourceMap								
					// 			}
					// 		},
					// 		{
					// 			loader: 'sass-loader',
					// 			options:{
					// 				sourceMap: enabledSourceMap,
					// 				minimize: true								
					// 			}
					// 		}
					// 	]
					// })
					use: [
					  // linkタグに出力する機能
					  {
					  	loader:'style-loader'
					  },
					  // CSSをバンドルするための機能
					  {
					    loader: 'css-loader',
					    options: {
					      // オプションでCSS内のurl()メソッドの取り込みを禁止する
					      url: true,
					      sourceMap: enabledSourceMap,
					      // Sass+PostCSSの場合は2を指定
					      importLoaders: 2
					    }
					  },
					  // PostCSSのための設定
					  {
					    loader: 'postcss-loader',
					    options: {
					    	plugins: ( loader ) => [require('autoprefixer') ],
					      sourceMap: enabledSourceMap,
					    }
					  },
					  // Sassをバンドルするための機能
					  {
					    loader: 'sass-loader',
					    options: {
					    	url:true,
					      sourceMap: enabledSourceMap,
					    }
					  }
					]
				},
				{
					/**
					*file-loaderはファイルをバンドルせずに外部ファイルの参照を保つためのローダー
					*/
					test: /\.(gif|png|jpg|eot|woff|ttf|svg)$/,
					exclude: /node_modules\/^(slick-carousel)/,
					use: {
						loader:'file-loader',
						// options: {
		    //                 name: './img/[name].[ext]'
						// }
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
	   //  //                 name: './img/[name].[ext]'
				// 	// }
				// },								
				{
					test: /\.html$/,
					use: {
						loader: 'html-loader'
					}
				}
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
		        // 今回はvendorだが、任意の名前で問題ない
		        vendor: {
		          // node_modules配下のモジュールをバンドル対象とする
		          test: /node_modules/,
		          name: 'bundle',
		          chunks: 'async',
		          enforce: true
		        }
		      }				
			}
		},

		/**
		*
		*/
		output: {
			path: path.resolve( __dirname, 'dist' ),
			// publicPath: '/dist',		
			publicPath: '/',
			filename: '[name].js'
		},

	    plugins: [
	        new ExtractTextPlugin({
			   filename: 'main.css'
			})
	    ],

		resolve: {
			extensions: ['.js', '.jsx', '.css', '.scss'],
			alias: {
				slick: path.resolve( __dirname, 'node_modules/slick-carousel/slick/') 
			}
		},	    
	},
	{
		entry: [
		 path.resolve(__dirname, './src/ejs/index.ejs'),
		]
		,	
		module: {
			rules: [
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
						test: /\.(gif|png|jpg|eot|woff|ttf|svg)$/,
						exclude: /node_modules\/^(slick-carousel)/,
						use: {
							loader:'file-loader',
						}
					},						
			]
		},

		output: {
			path: path.resolve( __dirname, 'dist' ),
			publicPath: '/',
			filename: '[name].html'
		},

	    plugins: [
	        new HtmlWebpackPlugin({ 
				filename: 'index.html',
				template: './src/ejs/index.ejs'
			}),
	        new HtmlWebpackPlugin({ 
				filename: 'about/index.html',
				template: './src/ejs/about/index.ejs'
			}),
	    ]
	}
];