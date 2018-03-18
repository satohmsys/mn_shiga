/*******************

weback config
for static website

update : 201803

-webpack4 x sass
@link: https://ics.media/entry/17376
@link: https://gist.github.com/mburakerman/629783c16acf5e5f03de60528d3139af

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
		// '' : path.resolve(__dirname, './src/html/index.html') //To Hot Reload
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
			                ['env', {'modules': false}]
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
				  'style-loader',
				  // CSSをバンドルするための機能
				  {
				    loader: 'css-loader',
				    options: {
				      // オプションでCSS内のurl()メソッドの取り込みを禁止する
				      url: true,
				      sourceMap: enabledSourceMap,
				      // Sass+PostCSSの場合は2を指定
				      importLoaders: 2
				    },
				  },
				  // PostCSSのための設定
				  {
				    loader: 'postcss-loader',
				    options: {
				    	plugins: ( loader ) => [require('autoprefixer') ],
				      sourceMap: enabledSourceMap,
				    },
				  },
				  // Sassをバンドルするための機能
				  {
				    loader: 'sass-loader',
				    options: {
				      sourceMap: enabledSourceMap,
				    }
				  }
				],
			},
			{
				test: /\.(gif|png|jpg|eot|woff|ttf|svg|css)$/,
				exclude: /node_module/,
				use: 'file-loader',
				// options: {
				// 	limit: 8192,
    //                 name: './img/[name].[ext]'
				// }
			},		
			{
				test: /\.html$/,
				use: 'html-loader'
			}
		]
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
		}),
        new HtmlWebpackPlugin({ 
			filename: 'index.html',
			template: './src/html/index.html'
		})
    ],

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			slick: path.resolve( __dirname, 'node_modules/slick-carousel/slick/') 
		}
	}
}];