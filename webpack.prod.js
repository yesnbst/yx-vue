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
		publicPath: "./"		// 测试环境删除
	},
	module: {
		rules: [
			{test: /\.vue$/,loader: 'vue-loader',},
		    // {test: /\.css$/,use: ['style-loader', 'css-loader']},
		    {test: /\.(png|svg|jpg|gif)$/, loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'},
		    {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader', publicPath:'../' })},
		]
	},
	resolve: {
		alias: {
		    'vue$': 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin({
            filename: 'css/[name].css' // 单独提取打包的CSS路径以及命名
        }),
        new HtmlWebpackPlugin({		// 文件生成路径默认是根据output的路径
    	 	filename: 'index.html',
            template: './src/views/index.html',
            inject: 'body',
        }),
	]
};
