function HSliderButton(x,y,range,id,callback){
	UIInput.call(this,x,y,id,{});
	this.init(x,y);
	this.x1 = x;
	this.x2 = x+range;
	this.range = range;
	// callback sould take a range of zero to one (float)
	this.callback = callback || {};
}

HSliderButton.prototype = subclassOf(UIInput);

HSliderButton.prototype.init = function(x,y) {
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	
	// object must be passed because jQuery does not support 
	// using the this keyword for objects. this in the context of
	// events reffers to the parent element
	$('#'+this.id).bind('mousedown',this,this.mouseDown);
};

HSliderButton.prototype.mouseMove = function(e){
	var sbutton = e.data,
		new_x = e.pageX-15;

	if(new_x > sbutton.x1 && new_x < sbutton.x2){
		sbutton.setPosition(new_x,sbutton.y);
		sbutton.callback((sbutton.x-sbutton.x1)/sbutton.range);
	} else if(new_x < sbutton.x1){
		sbutton.setPosition(sbutton.x1,sbutton.y);
		sbutton.callback(0);
	} else if(new_x > sbutton.x2){
		sbutton.setPosition(sbutton.x2,sbutton.y);
		sbutton.callback(1);
	}
};

HSliderButton.prototype.mouseUp = function(e){
	var sbutton = e.data;

	$(document).unbind('mouseup');
	$(document).unbind('mousemove');

	sbutton.setPosition(e.pageX,sbutton.y);
	sbutton.callback((sbutton.x-sbutton.x1)/sbutton.range);	
};


HSliderButton.prototype.mouseDown = function(e) {
	var sbutton = e.data;
	$(document).bind('mousemove',sbutton,sbutton.mouseMove);
	$(document).bind('mouseup',sbutton,sbutton.mouseUp);
};
