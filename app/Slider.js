var OFFSET = 10;

function HSliderButton(x,y,range,id,callback){
	UIInput.call(this,x,y,id,{});
	this.init(x,y);
	this.x1 = x;
	this.x2 = x+range-OFFSET;
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

	$('#'+this.id).bind('mousedown',this,this.mouseDown);
};

HSliderButton.prototype.mouseMove = function(e){
	// note, jquery rewrites 'this'
	var sbutton = e.data,
		new_x = e.pageX-OFFSET;

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
	// note, jquery rewrites 'this'
	$(document).unbind('mouseup');
	$(document).unbind('mousemove');
};


HSliderButton.prototype.mouseDown = function(e) {
	// note, jquery rewrites 'this'
	var sbutton = e.data;
	$(document).bind('mousemove',sbutton,sbutton.mouseMove);
	$(document).bind('mouseup',sbutton,sbutton.mouseUp);
};

// ------------------------------------

function Slider(x,y,range,id,callback){

	var ypos = y+OFFSET,
		xpos = x+OFFSET,
		width = range-OFFSET;
	
	$('<div/>',{
		'class': 'slider_bar',
		'id': this.id,
	}).appendTo('body')
	  .css({
		'width': range+'px',
		'top': ypos+'px',
		'left': x+'px'
	});
	

	this.button = new HSliderButton(x,y,range,id+'btn',callback);


};
