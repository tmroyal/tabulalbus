function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
BrushViewer.prototype = UIElement();

function BrushViewer(x,y,id){
	var this_=this;
	UIElement.call(this_,x,y,id);

	this_.init = function(x,y) {
		$('<div/>', {
			'id': this_.id
		})
		.appendTo('body')
		.css({
			'class' : 'bordered',
			'width' : '50px',
			'height': '50px'
		})
	
		this_.setPosition(x,y);
	};


	this_.updateColor = function(color) {
		$('#'+this_.id).css({
			'background-color': 'rgb('+color.r+','+color.g+','+color.b+')'
		});
	};
	
	this_.init(x,y);
};


function Color(h,s,v){
	var this_ = this;
	
	this_.h = h;
	this_.s = s;
	this_.v = v;
	this_.callbacks = [];	

	this_.setH = function(h) {
		this_.h = h;
		this_.update_color();
	};

	this_.setS = function(s) {
		this_.s = s;
		this_.update_color();
	};	
	this_.setV = function(v) {
		this_.v = v;
		this_.update_color();
	};

	this_.update_color = function() {
		this_.color = this_.HSVtoRGB(this_.h,this_.s,this_.v);
		console.log(this_.color);
		for (i in this_.callbacks){

					this_.callbacks[i](this_.color);
				}
	};

	this_.HSVtoRGB = function(h, s, v){
	    // courtesy http://mjijackson.com/
		var r1, g1, b1;

	    var i = Math.floor(h * 6);
	    var f = h * 6 - i;
	    var p = v * (1 - s);
	    var q = v * (1 - f * s);
	    var t = v * (1 - (1 - f) * s);

	    switch(i % 6){
	        case 0: r1 = v, g1 = t, b1 = p; break;
	        case 1: r1 = q, g1 = v, b1 = p; break;
	        case 2: r1 = p, g1 = v, b1 = t; break;
	        case 3: r1 = p, g1 = q, b1 = v; break;
	        case 4: r1 = t, g1 = p, b1 = v; break;
	        case 5: r1 = v, g1 = p, b1 = q; break;
	    }
	    return {
			r:Math.floor(r1 * 255), 
			g:Math.floor(g1 * 255), 
			b:Math.floor(b1 * 255)
				};
	}

	this_.add_callback = function(callback) {
		this_.callbacks.push(callback);
	};
	
	this_.color = this_.HSVtoRGB(this.h,this.s,this.v);
};

UIInput.prototype = new UIElement();

function UIInput(x,y,id,onclick){
	var this_ = this;
	
	UIElement.call(this_,x,y,id);
	this_.onclick = onclick || {};
	
	this_.enable = function(){
		this_.enabled = true;
		$('#'+this_.id).click(this_.onclick);
	};
	
	this_.disable = function(){
		this_.enabled = false;
		$('#'+this_.id).unbind('click');
	};
};
function UIElement(x,y,id){
	var this_ = this;
	
	this_.x = x;
	this_.y = y;
	this_.id = id;
	
	this_.setPosition = function(x,y){
		this_.x = x;
		this_.y = y;
		$('#'+this_.id).css({
			'top': this_.y+'px',
			'left': this_.x+'px'
		});
	};
	this_.addImage = function(x,y,uri) {
		$('<img/>',{
			'src' : uri
		}).appendTo('body').css({
			'top' : y,
			'left' : x
		});
	};	
}


Button.prototype = UIInput();

function Button(x,y,id,onclick){
	var this_ = this;
	
	UIInput.call(this,x,y,id,onclick)
	this_.init(x,y);
	
	this_.init = function(x,y){
		$('<div/>',{
			'class': 'button bordered',
			'id': this.id
		}).appendTo('body');
	
		this.setPosition(x,y);
		$('#'+this.id).click(this.onclick);
	};
};

var OFFSET = 6;

HSliderButton.prototype = UIInput();

function HSliderButton(x,y,range,id,callback){
	var this_=this;
	
	UIInput.call(this_,x,y,id,{});
	this_.x1 = x;
	this_.x2 = x+range-20;
	this_.range = range;
	// callback sould take a range of zero to one (float)
	this_.callback = callback || {};



	this_.init = function(x,y) {
		$('<div/>',{
			'class': 'slider_button bordered',
			'id': this_.id
		}).appendTo('body');
	
		this_.setPosition(x,y);

		$('#'+this_.id).bind('mousedown',this_.mouseDown);
	};

	this_.mouseMove = function(e){
		// note, jquery rewrites 'this'
		var new_x = e.pageX-OFFSET;

		if(new_x > this_.x1 && new_x < this_.x2){
			this_.setPosition(new_x,this_.y);
			this_.callback((this_.x-this_.x1)/this_.range);
		} else if(new_x < this_.x1){
			this_.setPosition(this_.x1,this_.y);
			this_.callback(0);
		} else if(new_x > this_.x2){
			this_.setPosition(this_.x2,this_.y);
			this_.callback(1);
		}
	};

	this_.mouseUp = function(e){
		$(document).unbind('mouseup');
		$(document).unbind('mousemove');
	};


	this_.mouseDown = function(e) {
		$(document).bind('mousemove',this_.mouseMove);
		$(document).bind('mouseup',this_.mouseUp);
	};
	
	this_.init(x,y);
	
};

// ------------------------------------

function Slider(x,y,range,id,callback){
	var this_ = this;
	
	var ypos = y+OFFSET,
		xpos = x+OFFSET,
		width = range-OFFSET;

	
	$('<div/>',{
		'class': 'slider_bar',
		'id': this.id
	}).appendTo('body')
	  .css({
		'width': range+'px',
		'top': ypos+'px',
		'left': x+'px'
	});
	
	this_.button = new HSliderButton(x,y,range,id+'btn',callback || function(){});
};

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



$(document).ready(function(){

	var clr = new Color(0,1,1,'color');

	var cp = new ColorPicker(20,20,'cp',clr);
	var	brush_viewer = new BrushViewer(400,400,'bview');
	brush_viewer.updateColor({r:230,g:100,b:120});
	clr.add_callback(brush_viewer.updateColor);
	
});
