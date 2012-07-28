var compressor = require('node-minify');

new compressor.minify({
    type: 'gcc',
    fileIn: './app/app.js',
    fileOut: 'tabulalbus.js',
    callback: function(err){
        console.log(err);
    }
});