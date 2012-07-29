var compressor = require('node-minify');

new compressor.minify({
    type: 'no-compress',
    fileIn: [
				'./sugar/subclassOf.js'
				,'./app/UIInput.js'
				,'./app/UIElement.js'
				,'./app/Button.js'
				,'./app/HSliderButton.js'
				,'./app/app.js'
			],
    fileOut: 'tabulalbus.js',
    callback: function(err){
        console.log(err);
    }
});