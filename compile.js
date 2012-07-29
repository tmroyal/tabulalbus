var compressor = require('node-minify');

new compressor.minify({
    type: 'no-compress',
    fileIn: [
				'./app/button.js','./app/app.js'
			],
    fileOut: 'tabulalbus.js',
    callback: function(err){
        console.log(err);
    }
});