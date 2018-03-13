/*******************

weback config
for static website
-webpack
@link: http://dackdive.hateblo.jp/entry/2016/05/07/183335
@link: http://dackdive.hateblo.jp/entry/2016/04/13/123000
@link: https://qiita.com/one-kelvin/items/b810aafb6b5ef90789a3
-sass
@link: http://kinosuke.hatenablog.jp/entry/2017/08/02/100051

*******************/

const webpack = require( 'webpack' );
const path = require( 'path' );
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});



module.exports = [{
	//developmentだとsource mapも有効化
	mode: 'development',


	devServer: {
		contentBase: 'dist', //ここをルートとしてサーブ
		open: true,
		inline: true,
		hot: true,
		port: 3000		
	},	

	//エントリーポイントを指定しなければ自動的に「src/index.js」がエントリーポイントに
	entry: './src/index.js',


	/**
	*ファイル変換
	*loaderは右から左に適用
	* v3 module.loaders -> v4 module.rules
	* loader -> css-loader!sass-loader
	* use -> use: { 'css-loader','sass-loader'} 
	*/	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules',
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
				exclude: '/node_modules',
				use: extractPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'sass-loader'
					]
				})
			},
			{
				test: /\.css$/,
				exclude: '/node_modules',
		       use: [
		          'style-loader',
		          {loader: 'css-loader', options: {url: false}},
		        ]
			},
			// {
			// 	test: /\.(gif|png|jpg|eot|woff|ttf|svg|css)$/,
			// 	exclude: '/node_modules',
			// 	use: 'url-loader'
			// }
		]
	},

	//出力先設定
	output: {
		path: path.resolve( __dirname, 'dist' ),
		// publicPath: '/dist',
		filename: 'main.js'
	},

    plugins: [
        extractPlugin
    ],

	resolve: {
		extensions: ['.js', '.jsx'],
	}
}];