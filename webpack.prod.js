const path= require('path');
const nodeExternals = require('webpack-node-externals'); 

module.exports={
    entry:{
        main:'./index.js'
    },
    output:{
        path:path.join(__dirname,'/dist'),
        publicPath:'/dist/',
        filename: 'mymain.js',
        clean :true
    },
    mode:'production',
    target:'node',
    externals: [nodeExternals()],    
    devServer: { devMiddleware: { writeToDisk: true } },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/nodemodules/,
                loader:"babel-loader"
            }
        ]
    }
};