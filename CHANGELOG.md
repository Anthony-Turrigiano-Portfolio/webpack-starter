# 1.0.6 - 07-07-2017
- Update to Webpack 3.1.0
- Added Scope Hoisting support

# 1.0.5 - 06-26-2017 
- Update webpack.common.config.js refractors excludeAssets key under HtmlWebPack plugin so that style.[chunkname].css does not get included in the head of index.html file
- Update purifycss plugin 
- Refractored index.pug file ( added image to hero )

# 1.0.4 - 06-16-2017
- Fix typo in webpack.dev.config.js - add a dot between webpack.dev.config.js in line 2 of the comments
- Update comment in line 2

# 1.0.3 - 06-15-2017
- Fix typo in webpack.dev.config.js - progress key was spelled wrong
- Add .jsx extension to resolve list

# 1.0.2 - 06-13-2017
- Remove clean-webpack-plugin from webpack-dev-config
- Update index.pug template
- Add components, layput, pages, themes, utils folders inside scss folder

# 1.0.1 - 06-05-2017
- Add postcss-loader to list of loaders for styles in the webpack.dev.config.js file
- Install localhost and concurrently to make webpack-dev-server more compatiable with other platforms
- Add html-loader to webpack.common.config.js file
- Add new resolusion for jquery to work with bootstrap
- Apply happypack to babel loaders and html loaders 

# 1.0.0 - 06-04-2017
- Initial Setup
