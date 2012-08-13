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
					'border-width': '2px',
					'cursor': 'crosshair'});
					
		$('#' + this_.id).bind('mousedown',this_.mousedown);
		
		this_.setPosition(x,y);
		this_.canv_element = document.getElementById(this_.id);
		this_.canvas = this_.canv_element.getContext('2d');
	};
	
	this_.mousedown = function(e){
		var x = e.pageX-this_.canv_element.offsetLeft;
		var y = e.pageY-this_.canv_element.offsetTop;
		
		this_.painter.dropBrush(x,y,this_.canvas);
		e.originalEvent.preventDefault();
		
		
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

