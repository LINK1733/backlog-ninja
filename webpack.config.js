const path = require('path'),
	{ WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
	watch: process.argv.includes('development'),
	entry: {
		main: './src/static/main.js',
		splash: './src/static/splash.js',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].[contenthash].js',
		publicPath: '',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [new WebpackManifestPlugin()],
	// resolve: {
	// 	fallback: {
	// 		util: require.resolve('util/'),
	// 	},
	// },
};
