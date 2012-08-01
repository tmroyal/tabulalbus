function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
function Brush(uri,spacing, size){
	var this_ = this;
	this_.loaded = false;
	this_.size = size;
	
	this_.img = new Image();
	this_.img.onload = function(){
		this_.loaded = true;
	};
	this_.img = uri;
	
	this_.moveCursor = function(){
		// upon motion, record the number of pixels moved
		// if gt spacing add a point
		// then mod, add pnt, until done
	};
	this_.write = function(canvas){
		this_;
		
		// iterate through points made in moveCursor, and write to canvas 
	};
	
	this_.writePrototype = function(canvas){
		// write once (or multitimes) for random
	}
	this_.reset = function(){
		
	};

	this_.setSize = function(size){
		this_.size = size;
	};
};
RandomBrush.prototype = new Brush();

function RandomBrush(uri, size){
	Brush.call(this,uri,0,size);
	var this_ = this;
	
	this_.draw = function(canvas){
		this_;
		
		// iterate through points made in moveCursor, and write to canvas 
	};
	
	this_.writePrototype = function(canvas){
		// write once (or multitimes) for random
	}
	
};


DirectionBrush.prototype = new Brush();

function DirectionBrush2(uri, size){
	Brush.call(this,uri,0,size);
	var this_ = this;
	
	this_.draw = function(canvas){
		this_;
		
		// iterate through points made in moveCursor, and write to canvas 
	};
	
	this_.writePrototype = function(canvas){
		// write once (or multitimes) for random
	}
	
};

Surface.prototype = new UIElement();

function Surface(x,y,id){
	var this_ = this;
	UIElement.call(this,x,y,id);
	
};


BrushViewer.prototype = UIElement();

function BrushViewer(x,y,id){
	var this_=this;
	UIElement.call(this_,x,y,id);

	this_.init = function(x,y) {
		$('<canvas/>', {
			'id': this_.id,

		})
		.appendTo('body')
		$('#' + this_.id).attr('height', 100).attr('width', 100);
		$('#' + this_.id).css({'border-style':'solid',
		'border-color': '#6e6e6e',
		'border-width': '2px',
		'border-radius': '10px'});
	
		this_.setPosition(x,y);
	};
	this_.init(x,y);


	this_.updateColor = function(color) {
		// $('#'+this_.id).css({
		// 			'background-color': 'rgb('+color.r+','+color.g+','+color.b+')'
		// 		});
		this_.canvas.clearRect(0,0,100,100);
		this_.canvas.drawImage( img, 0, 0 );
	    
		Caman("#"+id, function () {
		    this.colorize(color.r,color.g,color.b,100).render();
		});
	};
	
	// to do this, we will get the white image
	// and then do the imgproc stuff from play my code
	// and then use the brush viewer canvas to store the image(?)
	

	this_.canvas = document.getElementById(this_.id).getContext('2d');
	var img = new Image();
	
	img.onload=function(){

	    this_.canvas.drawImage( img, 0, 0 );
		Caman("#"+id, function () {
		    this.colorize(255,0,0,100).render();
		});
	};
	

	img.src='./img/markerw.png';
	
	//this_.canvas.fillRect(0,0,100,100);

};


function Color(h,s,v){
	var this_ = this;
	
	this_.h = h;
	this_.s = s;
	this_.v = v;
	this_.callbacks = [];
	this_.broadcastees = [];	

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
		for (i in this_.callbacks){
			this_.callbacks[i](this_.color);
		}
	};
	
	this_.broadcast = function(cb){
		for (i in this_.broadcastees){
			this_.broadcastees[i](this_.color);
		}
	}

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
	this_.add_broadcastee = function(broadcastee) {
		this_.broadcastees.push(broadcastee);
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

function HSliderButton(x,y,range,id,down_callback,up_callback){
	var this_=this;
	
	UIInput.call(this_,x,y,id,{});
	this_.x1 = x;
	this_.x2 = x+range-20;
	this_.range = range;
	// callback sould take a range of zero to one (float)
	this_.down_callback = down_callback || function(){};
	this_.up_callback = up_callback || function(){};


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
			this_.down_callback((this_.x-this_.x1)/this_.range);
		} else if(new_x < this_.x1){
			this_.setPosition(this_.x1,this_.y);
			this_.down_callback(0);
		} else if(new_x > this_.x2){
			this_.setPosition(this_.x2,this_.y);
			this_.down_callback(1);
		}
	};

	this_.mouseUp = function(e){
		$(document).unbind('mouseup');
		$(document).unbind('mousemove');
		
		var new_x = e.pageX-OFFSET;
		
		if(new_x > this_.x1 && new_x < this_.x2){
			this_.setPosition(new_x,this_.y);
			this_.up_callback((this_.x-this_.x1)/this_.range);
		} else if(new_x < this_.x1){
			this_.setPosition(this_.x1,this_.y);
			this_.up_callback(0);
		} else if(new_x > this_.x2){
			this_.setPosition(this_.x2,this_.y);
			this_.up_callback(1);
		}
	};


	this_.mouseDown = function(e) {
		$(document).bind('mousemove',this_.mouseMove);
		$(document).bind('mouseup',this_.mouseUp);
	};
	
	this_.set = function(v){
		if (v>1){v=1;}
		if (v<0){v=0;}
		this_.x = (this_.x2-this_.x1)*v+this_.x1;
		this_.down_callback(v);
		this_.up_callback(v);
		this_.setPosition(this_.x,this_.y);
	};
	
	this_.init(x,y);
	
};

// ------------------------------------

function Slider(x,y,range,id,dcallback,ucallback){
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
	
	this_.button = new HSliderButton(x,y,range,id+'btn',dcallback,ucallback);
	

	this_.set=function(pos){
		this_.button.set(pos);
	};

};

ColorPicker.prototype = new UIElement();

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


	this_.hueslider = new Slider(x+xoff,y,range,this_.id+'hue',this_.color.setH,this_.color.broadcast,0);
	this_.satslider = new Slider(x+xoff,y+ysep,range,this_.id+'sat',this_.color.setS,this_.color.broadcast,1);
	this_.valslider = new Slider(x+xoff,y+ysep*2,range,this_.id+'val',this_.color.setV,this_.color.broadcast,1);
	
	this_.addImage(x,y+ibump,'./img/h.png');
	this_.addImage(x,y+ibump+ysep,'./img/s.png');
	this_.addImage(x,y+ibump+ysep*2,'./img/v.png');
	
	this_.setIndicator = function(clr){
		$("#"+id+"indicator").css({
			'background-color':'rgb('+clr.r+','+clr.g+','+clr.b+')'
		})
	};
	
	$('<div/>',{
		'id':id+'indicator',
		'class':'bordered'
	}).appendTo('body')
	  .css({
		'top':y+ysep*3,
		'left':x+xoff,
		'width':'20',
		'height':'20'
	});
	
	this_.set_pos=function(h,s,v){
		this_.hueslider.set(h);
		this_.satslider.set(s);
		this_.valslider.set(v);
	}
};




$(document).ready(function(){
	var clr = new Color(0,0,0,'color');
	var cp = new ColorPicker(20,20,'cp',clr);
	var	brush_viewer = new BrushViewer(200,10,'bview');
	
	
	//brush_viewer.updateColor({r:230,g:100,b:120});
	//clr.add_callback(brush_viewer.updateColor);
	clr.add_callback(cp.setIndicator);
	clr.add_broadcastee(brush_viewer.updateColor);
	cp.set_pos(0,1,1);
});
