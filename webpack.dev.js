const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/main.js',  // 入口文件
	devtool: 'inline-source-map',
   	devServer: {
		contentBase: './dist'
   	},
	output: {
		filename: 'bundle.js',  // 编译后文件
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{test: /\.vue$/,loader: 'vue-loader',},
		    {test: /\.css$/,use: ['style-loader', 'css-loader']},
		    {test: /\.(png|svg|jpg|gif)$/, loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'},
		]
	},
	resolve: {
		alias: {
		    'vue$': 'vue/dist/vue.esm.js'
		}
	},
};
