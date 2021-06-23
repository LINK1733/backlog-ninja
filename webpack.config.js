const path = require('path');

module.exports = {
	watch: process.argv.includes('development'),
	entry: {
		main: './src/static/main.js',
		splash: './src/static/splash.js'
	},  
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
};