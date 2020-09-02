const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        bundle: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {

    }
}