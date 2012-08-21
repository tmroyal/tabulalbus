#!/usr/local/bin/node

var compressor = require('node-minify');

new compressor.minify({ 
    type: 'no-compress',
    fileIn: [
				'./app/UI/Brush.js'
				,'./app/UI/BrushSizeSlider.js'
				,'./app/UI/BrushSelector.js'
				,'./app/UI/Surface.js'
				,'./app/UI/Painter.js'
				,'./app/UI/Color.js'
				,'./app/UI/UIInput.js'
				,'./app/UI/UIElement.js'
				,'./app/UI/Button.js'
				,'./app/UI/Slider.js'
				,'./app/UI/ColorPicker.js'
				,'./app/app.js'
			],
    fileOut: './tabulalbus.js',
    callback: function(err){
        console.log(err);
    }
});