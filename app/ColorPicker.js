function ColorPicker(x,y,id){
	this.hueslider = Slider(x,y,id+'hue',{});
	this.satslider = Slider(x,y+30,id+'hue',{});
	this.valslider = Slider(x,y+60,id+'hue',{});
	this.setPosition(x,y);
	this.init();
}

ColorPicker.prototype = subclassOf(UIElement);

ColorPicker.prototype.init = function(){
	
};
