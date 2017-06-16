/**
 * postcss.config.js
 * @author: Anthony Turrigiano <anthony.turrigiano@gmail.com>
 * @description: postcss config list of plugins that will run 
 */

/**
 * Import dependency modules
 */
const cssNext       = require('postcss-cssnext');
const fontMagician  = require('postcss-font-magician');

/**
 *  Check if running in production mode, returns true,
 * if we are and false if we are not
 */
const isProd = process.env.NODE_ENV === 'production'

/**
 * Assign the postcss-font=magician dependency to 
 * plugins array 
 */
const plugins = [
  fontMagician()
]

/**
 * Assign the following dependency(s) only if we are
 * running in production
 */

if(isProd){
  plugins.push(
    cssNext()
  )
}

/**
 * Export modules
 */
module.exports = { plugins }
