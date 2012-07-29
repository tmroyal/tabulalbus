function HSliderButton(x,y,id){
	UIInput.call(this,x,y,id,{});
	this.init(x,y);
}

HSliderButton.prototype = subclassOf(UIInput);

HSliderButton.prototype.init = function(x,y) {
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	
	$('#'+this.id).bind('mousedown',this,this.mouseDown)	
};

HSliderButton.prototype.mouseMove = function(e){
	e.data.setPosition(e.pageX-15,e.pageY-15);
};

HSliderButton.prototype.mouseUp = function(e){
	$('body').unbind('mouseup');
	$('#'+e.data.id).unbind('mousemove');	
};


HSliderButton.prototype.mouseDown = function(e) {
	$('#'+e.data.id).bind('mousemove',e.data,e.data.mouseMove);
	$(document).bind('mouseup',e.data,e.data.mouseUp);
};




