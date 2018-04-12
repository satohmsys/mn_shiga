/**
* variables
* @ デフォルトはdevelopmentモードの設定。
*/

const path = require( 'path' );

module.exports = {
	MODE : 'development',
	enabledSourceMap : true,
	PATHS : {
		dir: {
			output: 'assets'
		},
		devServer: {
			contentBase: 'dist' 
		},
		output:{
			path: path.resolve(__dirname,'dist')
		}
	}
};