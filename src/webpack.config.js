const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index'
    },
    output: {
        path: __dirname + "/www",
        filename: '[name]-[hash:5].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: "./public", 
        port: 4444, // 监听端口号
        inline: true, // 实时刷新
        historyApiFallback: true
        // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    },
    resolve: {
        extensions: ['.js','.less']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            exclude: /node_moudles/
        },{
            test: /\.(css|less)$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "less-loader"
                }
            ]
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html' // new 一个这个插件的实例，并传入相关的参数
        }),
    ]
}