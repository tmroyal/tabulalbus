function ColorPicker(x,y,id,color){
	var this_ = this;
	UIElement.call(this_,x,y,id);

	this_.color = color;
	
	var ysep = 35,
		ibump = 3,
		xoff = 18,
		range = 150,
		indicator_size = ysep*2,
		indicator_left = x+range+xoff+10;

	this_.hueslider = Slider(x+xoff,y,range,this_.id+'hue',this_.color.setH);
	this_.satslider = Slider(x+xoff,y+ysep,range,this_.id+'sat',this_.color.setS);
	this_.valslider = Slider(x+xoff,y+ysep*2,range,this_.id+'val',this_.color.setV);
	
	this_.addImage(x,y+ibump,'./img/h.png');
	this_.addImage(x,y+ibump+ysep,'./img/s.png');
	this_.addImage(x,y+ibump+ysep*2,'./img/v.png');

};

ColorPicker.prototype = new UIElement();


