/**
 * webpack.config.js
 * @author: Anthony Turrigiano <anthony.turrigiano@gmail.com>
 * @description: webpack config 
 */

/**
 * Import module dependencies
 */
import path from 'path'
import WebpackConfig from 'webpack-config'
import webpackDevConfig from './webpack.dev.config'
import webpackCommonConfig from './webpack.common.config'
import webpackProdConfig from './webpack.prod.config'


/**
 * The variable holds the webpack configuration settings 
 */

let config = {}

/**
 * Get runtime environment 
 */

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

/**
 * Merge webpack common configuration settings with either
 * production or development settings based on the runtime environment
 */

if( isProd ){
    config = WebpackConfig().merge( webpackCommonConfig, webpackProdConfig )
}

if( isDev ){
    config = WebpackConfig().merge( webpackCommonConfig, webpackDevConfig )
}

/**
 * Export webpack configuration
 */

export default config