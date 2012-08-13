/*
 * BrushSizeSlider.js
 *
 * Description: Child of Slider, allows for the setting of the brush size.
 *
 *
 */
BrushSizeSlider.prototype = new Slider()

function BrushSizeSlider (x,y,range,id,painter_) {
	var this_ = this,
		painter = painter_;
	Slider.call(this,x+50,y,range,id,undefined,painter.userSetSize);

	addImage(x,y,"./img/Size.png");
}