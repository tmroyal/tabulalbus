function ColorPicker(x,y,id){
	UIElement.call(this,x,y,id);

	var ysep = 15,
		ibump = 3,
		xoff = 18,
		range = 100;

	this.hueslider = Slider(x+xoff,y,range,this.id+'hue');
	this.satslider = Slider(x+xoff,y+xoff,range,this.id+'sat');
	this.valslider = Slider(x+xoff,y+xoff*2,range,this.id+'val');
	
	this.addImage(x,y+ibump,'./img/h.png');
	this.addImage(x,y+ibump+xoff,'./img/s.png');
	this.addImage(x,y+ibump+xoff*2,'./img/v.png');

}

ColorPicker.prototype = subclassOf(UIElement);

ColorPicker.prototype.init = function() {
};
