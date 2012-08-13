#!/usr/local/bin/node

var compressor = require('node-minify');

new compressor.minify({
    type: 'no-compress',
    fileIn: [
				'./sugar/subclassOf.js'
				,'./app/Brush.js'
				//,'./app/RandomBrush.js'
				//,'./app/DirectionBrush.js'
				,'./app/BrushSizeSlider.js'
				,'./app/BrushSelector.js'
				,'./app/Surface.js'
				,'./app/Painter.js'
				,'./app/Color.js'
				,'./app/UIInput.js'
				,'./app/UIElement.js'
				,'./app/Button.js'
				,'./app/Slider.js'
				,'./app/ColorPicker.js'
				,'./app/app.js'
			],
    fileOut: 'tabulalbus.js',
    callback: function(err){
        console.log(err);
    }
});