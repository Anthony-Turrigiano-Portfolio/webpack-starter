/**
 * webpack.prod.config.js
 * @author: Anthony Turrigiano <anthony.turrigiano@gmail.com>
 * @description: Webpack configuration settings for production environment
 */

/**
 * Import module dependencies
 */

import path                             from 'path'
import glob                             from 'glob'
import cssnano                          from 'cssnano'
import webpack                          from 'webpack'
import HappyPack                        from 'happypack'
import CleanWebpackPlugin               from 'clean-webpack-plugin'
import WebpackShellPlugin               from 'webpack-shell-plugin'
import PurifyCssWeback                  from 'purifycss-webpack'
import UnminifiedWebpackPlugin          from 'unminified-webpack-plugin'
import ExtractTextWebpackPlugin         from 'extract-text-webpack-plugin'
import OptimizeCssAssetsWebpackPlugin   from 'optimize-css-assets-webpack-plugin'

/**
 * config variable, this will be used to 
 * store webpack configuration settings
 */

const config = {
    devtool: 'source-map',
    watch: false

}

/**
 * Webpack output configuration, the directory where the optimized files will be live
 */

config.output = {
    path: path.resolve( __dirname, "dist" ),
    publicPath: path.resolve( "/" ),
    filename: "public/js/[name].[chunkhash].min.js"
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

            {            
            enforce: 'pre',
            test: /\.jsx?$/,
            loader: 'standard-loader',                
            exclude: /node_modules/,               
            options: {            
                error: false,        
                snazzy: true,            
                parser: 'babel-eslint',
                fix: true
            }
        },

        /**
         * The test applies the extract-text-webpack-plugin to any
         * sass, scss, or css files. It will use the sass-loader to 
         * parse the sass or scss rules and then the css-loader to parse
         * the css. The style-loader will is used as a fallback.
         */

        {
            test: /\.(sass|scss|css)$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: ['style-loader'],
                use: 'happypack/loader?id=styles'
            })
        }

    ]
}

/**
 * Webpack plugins configuration, this will store an array of webpack plugins to use
 */

config.plugins = [
    
    /**
     * Use clean-webpack-plugin to delete the dist directory 
     * when running npm-build
     */

    new CleanWebpackPlugin([ "dist" ], {
       root: __dirname,
       exclude: [],
       verbose: true,
       dry: false
   }),

   
    /**
     * Webpack comes with uglifyjs built in, use uglifyjs plugin to 
     * minify javascript files
     */

    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    }),

    /**
     * The extract-text-webpack-plugin
     *  is used to create css files for the project 
     */

    new ExtractTextWebpackPlugin( 'public/css/style.[chunkhash].css' ),
    new ExtractTextWebpackPlugin( 'public/css/style.[chunkhash].min.css' ),    

    /**
     * Generate Uminified files to include in the build directory
     */
    
    new UnminifiedWebpackPlugin(),

    /**
     * Remove any unused css 
     */

    new PurifyCssWeback({
        paths: glob.sync(path.join(__dirname, 'src/views/*.pug')),
    }),

    /**
     * Minimize any css files that end with min.css
     */    
    
    new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.min\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),

    /**
     * Use the webpack-shell-plugin to run commands on the command line,
     * the plugin will delete any source maps for style.css
     */

    new WebpackShellPlugin({
        onBuildStart: [],
        onBuildEnd: ['rimraf dist/public/css/style.[chunkhash].css.map']
    }),

    /**
     * The Webpack commons chunk plugin extracts
     * common dependencies that each entry point 
     * uses and puts it in a seperate file
     */
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        chunks: []
    }),

    /**
     * The HappyPack plugin makes webpack builds faster by 
     * allowing you to transform multiple files in parallel.
     */
    new HappyPack({
            id: 'styles',
            threads: 4,
            loaders: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
    }),

    function () {
        this.plugin('done', stats => {
        
        })
    }
]

/**
 * Export webpack configuration
 */

export default config
