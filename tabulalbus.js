function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
function UIInput(x,y,id,onclick){
	UIElement.call(this,x,y,id);
	this.onclick = onclick || {};
};

UIInput.prototype = subclassOf(UIElement);

UIInput.prototype.enable = function(){
	this.enabled = true;
	$('#'+this.id).click(this.onclick);
};

UIInput.prototype.disable = function(){
	this.enabled = false;
	$('#'+this.id).unbind('click');
};
function UIElement(x,y,id){
	this.x = x;
	this.y = y;
	this.id = id;
}

UIElement.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
	$('#'+this.id).css({
		'top': this.y+'px',
		'left': this.x+'px'
	});
};

UIElement.prototype.addImage = function(x,y,uri) {
	$('<img/>',{
		'src':uri
	}).appendTo('body').css(
	{
		'top':y+'px',
		'left':x+'px'
	}
	);
};

function Button(x,y,id,onclick){
	UIInput.call(this,x,y,id,onclick)
	this.init(x,y);
	
};

Button.prototype = subclassOf(UIInput);

Button.prototype.init = function(x,y){
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	$('#'+this.id).click(this.onclick);
};


var OFFSET = 6;

function HSliderButton(x,y,range,id,callback){
	UIInput.call(this,x,y,id,{});
	this.init(x,y);
	this.x1 = x;
	this.x2 = x+range-20;
	this.range = range;
	// callback sould take a range of zero to one (float)
	this.callback = callback || {};
}

HSliderButton.prototype = subclassOf(UIInput);

HSliderButton.prototype.init = function(x,y) {
	$('<div/>',{
		'class': 'slider_button bordered',
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
	
	
	this.button = new HSliderButton(x,y,range,id+'btn',callback || function(){});


};

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

$(document).ready(function(){
	var cp = new ColorPicker(20,20,'cp')
});
