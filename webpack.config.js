const path = require('path'),
	{ WebpackManifestPlugin } = require('webpack-manifest-plugin'),
	CopyPlugin = require('copy-webpack-plugin'),
	Dotenv = require('dotenv-webpack');

module.exports = {
	target: ['web'],
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
	plugins: [
		new WebpackManifestPlugin(),
		new Dotenv({ expand: true }),
		new CopyPlugin({
			patterns: [
				{
					from: '**/*.jpg',
					context: './src/static/',
				},
				{
					from: '**/*.png',
					context: './src/static/',
				},
				{
					from: '**/*.ico',
					context: './src/static/',
				},
			],
		}),
	],
};
