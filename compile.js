var compressor = require('node-minify');

new compressor.minify({
    type: 'no-compress',
    fileIn: [
				'./app/ui_input.js','./app/button.js','./app/app.js'
			],
    fileOut: 'tabulalbus.js',
    callback: function(err){
        console.log(err);
    }
});