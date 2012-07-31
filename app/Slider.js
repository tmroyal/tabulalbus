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
