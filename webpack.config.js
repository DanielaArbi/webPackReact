const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizzerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//objeto de configuraciones
module.exports = {
    entry: './src/index.js', //lo que se va a mostrar
    output: {
        path: path.resolve(__dirname, 'dist'),  //como vamos a enviar el resurso una vez preparado
        filename : 'bundle.js', //resultado del output
        publicPath : './',
    },
    resolve : {//las diferentes extensiones
        extensions : ['.js','.jsx'],
        alias : {
            '@components': path.resolve(__dirname,'src/components/'),
            '@styles' : path.resolve(__dirname, 'src/styles/'),
        }
    },
    mode : 'production',
    module : { //reglas
      rules : [
        {
            test : /\.(js|jsx)$/, //expresion regular que nos permite estas extensiones
            exclude: /node_modules/, //lo excluimos para no encontrar estos recursos
            use : {
                loader : 'babel-loader',
            }
        },
        {
        test : /\.html$/,
        use : [
            {loader : 'html-loader'}
        ]
        },
        {
            test : /\.s[ac]ss$/,
            use : 
                
                   [
                        'style-loader',
                        'css-loader',
                        'sass-loader'   
                    ]
                
            
        }
      ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template : './public/index.html',
            filename : './index.html'
        }),
        new MiniCssExtractPlugin({
            filename : '[name].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization : {
        minimize : true,
        minimizer :[
            new CssMinimizzerPlugin(),
            new TerserPlugin(),
        ]
    }
}