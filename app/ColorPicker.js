function ColorPicker(x,y,id,color){
	UIElement.call(this,x,y,id);

	this.color = color;
	
	var ysep = 35,
		ibump = 3,
		xoff = 18,
		range = 150,
		indicator_size = ysep*2,
		indicator_left = x+range+xoff+10;

	this.hueslider = Slider(x+xoff,y,range,this.id+'hue',this.color.setH);
	this.satslider = Slider(x+xoff,y+ysep,range,this.id+'sat',this.color.setS);
	this.valslider = Slider(x+xoff,y+ysep*2,range,this.id+'val',this.color.setV);
	
	this.addImage(x,y+ibump,'./img/h.png');
	this.addImage(x,y+ibump+ysep,'./img/s.png');
	this.addImage(x,y+ibump+ysep*2,'./img/v.png');

};

ColorPicker.prototype = subclassOf(UIElement);


