const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//objeto de configuraciones
module.exports = {
    entry: './src/index.js', //lo que se va a mostrar
    output: {
        path: path.resolve(__dirname, 'dist'),  //como vamos a enviar el resurso una vez preparado
        filename: 'bundle.js', //resultado del output
    },
    resolve: {//las diferentes extensiones
        extensions: ['.js', '.jsx']
    },
    mode: 'development',
    module: { //reglas
        rules: [
            {
                test: /\.(js|jsx)$/, //expresion regular que nos permite estas extensiones
                exclude: /node_modules/, //lo excluimos para no encontrar estos recursos
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader' }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use:
                    [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8000,
        open: true,
    }
}