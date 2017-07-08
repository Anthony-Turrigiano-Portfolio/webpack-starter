/**
 * webpack.common.config.js
 * @author: Anthony Turrigiano <anthony.turrigiano@gmail.com>
 * @description: Webpack common configuration settings for both production and development environment
 */

/**
 * Import module dependencies
 */
import path                             from 'path'
import webpack                          from 'webpack'
import HappyPack                        from 'happypack'
import HtmlWebpackPlugin                from 'html-webpack-plugin'
import CleanWebpackPlugin               from 'clean-webpack-plugin'
import HtmlWebpackExcludeAssetsPlugin   from 'html-webpack-exclude-assets-plugin'

/**
 * config variable, this will be used to 
 * store webpack configuration settings
 */

const config = {

    /**
     * the config.context points to the src folder of the project 
     */

    context: path.resolve( __dirname, "src" )
}

/**
 * Webpack entry configuration, define project entry points for project
 */

config.entry = {
    app: [ './app', './scss/style', './views/index', 'jquery', 'bootstrap-sass', 'waypoints'],
    
}

/**
 * Webpack resolve configuration, resolve extensions key allows you
 * to import a file without needing to reference the extension. You
 * use the alias key to map to a dependency  
 */

config.resolve = {
    extensions: ['.js', 'jsx', '.scss', '.sass', '.less', '.css', '.html', '.ts', '.pug'],
    alias: {
      'waypoints': 'waypoints/lib/jquery.waypoints.min.js',
      'sticky': '../node_modules/waypoints/lib/shortcuts/sticky.min.js'
    }

}

config.module = {

    /**
     * Rules array, contains the tests that will run for each file extension
     * and which loader to apply it to
     */

    rules: [

        /**
         * Test for pug files, note HappyPack 
         * is not compatible with pug-loader
         */

        {
            test: /\.pug$/,
            exclude: /node_modules/,
            use:  ['html-loader', 'pug-html-loader']
        },

        /**
         * Test for typescript files, note HappyPack 
         * is not compatible with ts-loader
         */

        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use:  ['ts-loader']
        },

        /**
         * Test for html files
         */

        {
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'happypack/loader?id=html'
        },

        /**
         * Test for javascript and jsx files
         */

        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'happypack/loader?id=babel'
        },
        
        /**
         * Test for any font extensions listed below for bootstrap-sass and font-awesome 
         * and move them to the fonts folder in the output directory
         */

        {
            test: /\.(woff|woff2|otf|ttf|eot|svg)(\?[\s\S]+)?$/,
            include: [/node_modules\/bootstrap-sass/, /node_modules\/font-awesome/],
            loaders: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '../fonts/[name].[ext]',
                        publicPath: '../',
                        outputPath: 'public/fonts/'
                    }                
                }
            ]
        },

        /**
         * Test for any image extensions listed below and copy them from the src 
         * directory to the public/img directory within the output directory
         */

        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            include: /src\/img/,
            loaders: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '../img/[name].[ext]', 
                        outputPath: "public/img/"                   
                        }                            
                    },
                    'img-loader'
                ]
            }

    ]
},

/**
 * Webpack plugins configuration, this will store an array of webpack plugins to use
 */

config.plugins = [
   
   /**
    * 
    */

    new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jQuery',
        jQuery: 'jquery',
        "window.jQuery": 'jquery',
        "windows.jQuery": 'jquery',
     }),

   /**
    * Scope Hoisting, introduced with version 3+ of webpack  
    */

     new webpack.optimize.ModuleConcatenationPlugin(),

   /**
    * Best practices to delete the output directory before building 
    * a new project 
    */    

   new HtmlWebpackPlugin({
        title: "Home Page",
        template: 'views/index.pug',
        excludeAssets: [/style.*.js/, /style.*.[^min].css/],
        chunks: ['app', 'vendor'],
        minify: {
               collapseWhitespace: true
            }
    }),

    /**
     * This is an addon to the html-webpack-plugin, the plugin
     * excludes any assets that you do not want linked in the 
     * head or body such as unminified files as an example. 
     * Edit the "excludeAssets" option above in the 
     * html-webpack plugin
     */

    new HtmlWebpackExcludeAssetsPlugin(),

    /**
     * The HappyPack plugin makes webpack builds faster by 
     * allowing you to transform multiple files in parallel.
     */
    new HappyPack({
        id: 'babel',
        threads: 4,
        loaders: [ 'babel-loader' ]
    }),
    new HappyPack({
        id: 'html',
        threads: 4,
        loaders: [ 'html-loader' ]
    })

]

/**
 * Export webpack configuration
 */

export default config
