function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
/*
 * Brush.js
 *
 * Description: stores brush image and 'stamps' painter with brush of specified size.
 *
 *
 */


function Brush(druri, drpuri){
	var this_ = this,
		drag_img_loaded = false,
		drop_img_loaded = false;


	this_.drag_img = new Image();
	this_.drag_img.onload = function(){
		drag_img_loaded = true;
	};
	this_.drag_img.src = druri;
	
	this_.drop_img = new Image();
	this_.drop_img.onload = function(){
		drop_img_loaded = true;
	};
	this_.drop_img.src = drpuri;
	
	this_.stamp = function(canvas, scaling){
		canvas.save(); 
		canvas.translate(50, 50);//what are the proper x and y
		canvas.scale(scaling,scaling);
		canvas.drawImage(this_.drag_img, -this_.drag_img.width/2, -this_.drag_img.height/2);
		canvas.restore();
		if(drag_img_loaded==false){console.log('theres the problem');}
	}
};
/*
 * Surface
 *
 * Description: Contains the canvas element, and a reference to all painters
 *				and facilitates all drawing to the screen
 *
 *
 */

Surface.prototype = new UIElement();

function Surface(x,y,w,h,id){
	UIElement.call(this,x,y,id);
	var this_ = this;
	this_.w = w;
	this_.h = h;
		
	this_.init = function(x,y){
		$('<canvas/>',{
			'id':id
		}).appendTo('body');
		$('#' + this_.id)
			.attr('height', this_.h)
			.attr('width', this_.w)
			.css({
				'border-style':'solid',
					'border-color': '#6e6e6e',
					'border-width': '2px'});
					
		$('#' + this_.id).bind('mousedown',this_.mousedown);
		
		this_.setPosition(x,y);
		this_.canv_element = document.getElementById(this_.id);
		this_.canvas = this_.canv_element.getContext('2d');
	};
	
	this_.mousedown = function(e){
		var x = e.pageX-this_.canv_element.offsetLeft;
		var y = e.pageY-this_.canv_element.offsetTop;

		this_.painter.dropBrush(x,y,this_.canvas);

		$(document).bind('mousemove',this_.mousemove);
		$(document).bind('mouseup',this_.mouseup);
	};
	
	this_.mousemove = function(e){
		var x = e.pageX-this_.canv_element.offsetLeft;
		var y = e.pageY-this_.canv_element.offsetTop;
		
		this_.painter.moveBrush(x,y,this_.canvas);
	};
	
	this_.mouseup = function(e){
		$(document).unbind('mousemove');
		$(document).unbind('mouseup');
	}
	
	this_.setPainter = function(painter){
		this_.painter = painter;
	}
	
	this_.init(x,y);
};


/*
 * Painter.js
 *
 * Description: A surface for displaying the brush and a canvas element that
 *				serves to enables drawing to the canvas. Hideable to support
 *				multiple-users.
 */

Painter.prototype = UIElement();

function Painter(x,y,id,color,init_brush, spacing_perc, size){
	var this_=this,
		current_dist = 0,
		scaling = size/100.0,
		spacing = size*spacing_perc,
		prev_x,
		prev_y;
		
	UIElement.call(this_,x,y,id);
	this_.curcolor = color;
	this_.brush = init_brush;

	this_.setBrush = function(brush){
		this_.brush = brush;
		this_.updateColor(this_.curcolor);
	};

	this_.init = function(x,y) {
		$('<canvas/>', {
			'id': this_.id
		})
		.appendTo('body')
		$('#' + this_.id).attr('height', 100).attr('width', 100);
		$('#' + this_.id).css({
			'border-style':'solid',
			'border-color': '#6e6e6e',
			'border-width': '2px',
			'border-radius': '10px'
		});
	
		this_.setPosition(x,y);
	};
	this_.init(x,y);

	this_.hide= function(){
		$('#'+this_.id).hide();
	}
	this_.show = function(){
		$('#'+this_.id).show();
	}

	this_.updateColor = function(color) {
		this_.canvas.clearRect(0,0);
		this_.brush.stamp(this_.canvas,scaling);
	    
		Caman("#"+id, function () {
		    this.colorize(color.r,color.g,color.b,100).render();
		});
		this_.brush.drawing = this_.canvas_element;

	};

	this_.canvas_element = document.getElementById(this_.id)
	this_.canvas = this_.canvas_element.getContext('2d');
	
	this_.dropBrush = function(x,y,canvas){
		prev_x = x;
		prev_y = y;
		//draw(prev_x,prev_y,Math.random(Math.pi*2),canvas,this_.drop_img);
	};
	
	this_.moveBrush = function(x,y,canvas){
		var dist_ang = getDistAndAngle(x,y);
		 
		current_dist+=dist_ang.dist;
		
		if(current_dist>spacing){
			//draw(x,y,dist_ang.ang,canvas,this_.drag_img);
			draw(x,y,dist_ang.ang,canvas,this_.canvas_element);
		}
		while (current_dist>spacing){
			var draw_x = prev_x+current_dist*Math.cos(dist_ang.ang),
				draw_y = prev_y+current_dist*Math.sin(dist_ang.ang);
			current_dist -= spacing;
			//draw(draw_x,draw_y,dist_ang.ang,canvas,this_.drag_img);
			draw(draw_x,draw_y,dist_ang.ang,canvas,this_.canvas_element);
			//draw(draw_x,draw_y,Math.random(Math.pi*2),canvas,this_.drag_img);
		}
		prev_x = x;
		prev_y = y;
	};
	
	var getDistAndAngle = function(x,y){
		var dx = x-prev_x,
			dy = y-prev_y;
		return {dist:Math.sqrt(dx*dx+dy*dy),ang:Math.atan2(dy,dx)};
	};
	
	this_.setScaling = function(size){
		scaling = size/100.0;
	};
	
	var draw = function(x,y,ang,canvas,img){
		canvas.save(); 
        canvas.globalAlpha = 0.2;
		canvas.translate(x, y);
		canvas.rotate(ang);
		//canvas.scale(scaling,scaling);
		canvas.drawImage(img,-img.width/2,-img.height/2);
		canvas.restore();        
	};
};

/*
 * Color.js
 *
 * Description: Contains the color with all applicable callbacks so that 
 				it's value is populated to all applicable places.
 *
 *
 */


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

/*
 * UIElement.js
 *
 * Description: Bass class for all UI elements that support user interaction.
 *
 */



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
/*
 * UIElement
 *
 * Description: Base class for all UI elements. 
 *
 *
 */



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


/*
 * Button
 *
 * Description: Class for a button. 
 *
 *
 */



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

/*
 * Slider.js
 *
 * Description: UIElement that supports the addition of a slider.
 *
 *
 */



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

/*
 * ColorPicker.js
 *
 * Description: Contains the UIElement in which the user
				changes the system color.
 *
 *
 */

	
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
	var brush = new Brush('./img/longBrush.png','./img/longBrushDown.png');
	var clr = new Color(0,0,0,'color');
	var cp = new ColorPicker(40,460,'cp',clr);
	var	brush_viewer = new Painter(240,460,'bview',clr,brush,0.2,40);
	
	//brush_viewer.updateColor({r:230,g:100,b:120});
	//clr.add_callback(brush_viewer.updateColor);
	clr.add_callback(cp.setIndicator);
	clr.add_broadcastee(brush_viewer.updateColor);
	cp.set_pos(0,1,1); 
	
	var surface = new Surface(40,40,800,400,'surface');
	//roung 0.2
	//thin 0.6
	//long 0.2

	
	surface.setPainter(brush_viewer);
	
});
