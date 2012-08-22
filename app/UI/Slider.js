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

		$('#'+this_.id).bind(downEvent,down);
	};
	
	var mousemove = function(e){
		var new_x = e.pageX-OFFSET;
		move(new_x);
	}
	
	var touchmove = function(e){
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		var new_x = touch.pageX-OFFSET;
		e.originalEvent.preventDefault();
		
		move(new_x);
	}

	var move = function(new_x){

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

	var mouseup = function(e){
		var new_x = e.pageX-OFFSET;
		
		up(new_x);
	};
	
	var touchup = function(e){
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		var new_x = touch.pageX-OFFSET;
		e.originalEvent.preventDefault();
		up(new_x);
	}
	
	var up = function(new_x){
		$(document).unbind(upEvent);
		$(document).unbind(moveEvent);
		
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
	}


	var down = function(e) {
		$(document).bind(moveEvent,moveCallback);
		$(document).bind(upEvent,upCallback);
	};
	
	this_.set = function(v){
		if (v>1){v=1;}
		if (v<0){v=0;}
		this_.x = (this_.x2-this_.x1)*v+this_.x1;
		this_.down_callback(v);
		this_.up_callback(v);
		this_.setPosition(this_.x,this_.y);
	};
	
	var downEvent=((document.ontouchstart!==null)?'mousedown':'touchstart');
	var moveEvent=((document.ontouchmove!==null)?'mousemove':'touchmove');
	var upEvent=((document.ontouchstart!==null)?'mouseup':'touchend');
	
	var moveCallback = (moveEvent=='mousemove') ? mousemove : touchmove;
	var upCallback = (upEvent=='mouseup') ? mouseup : touchup;
	
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
