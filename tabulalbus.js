function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
function Color(h,s,v){	
	this.h = h;
	this.s = s;
	this.v = v;
	this.color = this.HSVtoRGB(this.h,this.s,this.v);
	alert(this.color);
}

Color.prototype.setH = function(h) {
	this.h = h;
};
Color.prototype.setS = function(s) {
	this.s = s;
};	
Color.prototype.setV = function(v) {
	this.v = v;
};

Color.prototype.HSVtoRGB = function(h, s, v){
    // courtesy http://mjijackson.com/
	var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

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

	var ysep = 35,
		ibump = 3,
		xoff = 18,
		range = 150,
		indicator_size = ysep*2,
		indicator_left = x+range+xoff+10;

	this.hueslider = Slider(x+xoff,y,range,this.id+'hue');
	this.satslider = Slider(x+xoff,y+ysep,range,this.id+'sat');
	this.valslider = Slider(x+xoff,y+ysep*2,range,this.id+'val');
	
	this.addImage(x,y+ibump,'./img/h.png');
	this.addImage(x,y+ibump+ysep,'./img/s.png');
	this.addImage(x,y+ibump+ysep*2,'./img/v.png');
	
	$('<div/>',{
		'class': 'bordered',
		'id': this.id
	}).appendTo('body')
      .css({
		'width': indicator_size,
		'height': indicator_size,
		'top': y+3,
		'left': indicator_left
	});
};

ColorPicker.prototype = subclassOf(UIElement);


$(document).ready(function(){
	var cp = new ColorPicker(20,20,'cp');
	var clr = new Color(0,1,1);
});
