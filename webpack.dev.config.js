/**
 * webpackdev.config.js
 * @author: Anthony Turrigiano <anthony.turrigiano@gmail.com>
 * @description: Webpack configuration settings for development environment
 */

/**
 * Import module dependencies
 */

import path                 from 'path'
import webpack              from 'webpack'
import CleanWebpackPlugin   from 'clean-webpack-plugin'

/**
 * config variable, this will be used to 
 * store webpack configuration settings
 */

const config = {}

/**
 * Webpack output configuration, the directory where the optimized files will be live
 */

config.output = {
    path: path.resolve( __dirname, "dist" ),
    publicPath: path.resolve( "/" ),
    filename: "public/js/[name].[hash].min.js"
}

/**
 * Webpack Dev Server configuration settings
 */
config.devServer = {
    contentBase: path.resolve( __dirname, "dist" ),
    hot: true,
    inline: true,
    compress: true,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    clientLogLevel: "none",
    https: false,
    quiet: true,
    public: 'http://localhost:3000',
    overlay: {
        warnings: true,
        errors: true
    },
    headers: {
    "Title": "Webpack Starter",
    "Author": "Anthony Turrigiano <anthony.turrigiano@gmail.com"
    },
    stats: {
        colors: true,
        chunks: true,
        preogress: true
    }
}

/**
 * Webpack module configuration settings, contains a rules array,
 * that lists tests for each file extension in the project with 
 * the applied loader to use for that extension
 */

config.module = {

    /**
     * Rules array, contains the tests that will run for each file extension
     * and which loader to apply it to
     */

    rules: [

        /**
         * The test applies the the sass-loader to parse the 
         * sass or scss files and then the css-loader to parse
         * the css and the style-loader is used to inject the 
         * css rules inside the head element of the webpage using
         * the style element.
         */

        {
            test: /\.(sass|scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader' ]
        }
    
    ]
}

/**
 * Webpack plugins configuration, this will store an array of webpack plugins to use
 */

config.plugins = [

    /**
     * Use clean-webpack-plugin to delete the dist directory 
     * when running npm-dev
     */

    new CleanWebpackPlugin([ "dist" ], {
       root: __dirname,
       exclude: [],
       verbose: true,
       dry: true
   }),

    /**
     * The two plugins are needed for Hot Module Replacement (HMR)
     */

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

]

/**
 * Export webpack configuration
 */

export default config