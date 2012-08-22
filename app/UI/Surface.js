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
	

	
	var touchdown = function(){};
	var touchmove = function(){};
	var touchup = function(){};
	
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
					
		$('#' + this_.id).bind(downEvent,downCallback);
		
		this_.setPosition(x,y);
		this_.canv_element = document.getElementById(this_.id);
		this_.canvas = this_.canv_element.getContext('2d');
        this_.canvas.beginPath();
        this_.canvas.rect(0, 0, w, h);
        this_.canvas.fillStyle = 'white';
        this_.canvas.strokeStyle = 'white';
        this_.canvas.fill();
        this_.canvas.stroke();
	};
	
	// mouse functions
	
	var mousedown = function(e){
		var x = e.pageX-this_.canv_element.offsetLeft;
		var y = e.pageY-this_.canv_element.offsetTop;
				
		this_.painter.dropBrush(x,y,this_.canvas);
		e.originalEvent.preventDefault();
		
		$(document).bind(moveEvent,moveCallback);
		$(document).bind(upEvent,upCallback);
	};
	
	var mousemove = function(e){
		var x = e.pageX-this_.canv_element.offsetLeft;
		var y = e.pageY-this_.canv_element.offsetTop;
				
		this_.painter.moveBrush(x,y,this_.canvas);
	};
	
	var mouseup = function(e){
		$(document).unbind(moveEvent);
		$(document).unbind(upEvent);
	}
	
	// touch functions-----------
	
	
	var touchdown = function(e){
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      
		var x = touch.pageX-this_.canv_element.offsetLeft;
		var y = touch.pageY-this_.canv_element.offsetTop;
				
		this_.painter.dropBrush(x,y,this_.canvas);
		e.originalEvent.preventDefault();
		
		$(document).bind(moveEvent,moveCallback);
		$(document).bind(upEvent,upCallback);
	};
	
	var touchmove = function(e){
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		
		var x = touch.pageX-this_.canv_element.offsetLeft;
		var y = touch.pageY-this_.canv_element.offsetTop;
		e.originalEvent.preventDefault();
				
		this_.painter.moveBrush(x,y,this_.canvas);
	};
	
	var touchup = function(e){
		$(document).unbind(moveEvent);
		$(document).unbind(upEvent);
	}
	
	//-----------
	
	this_.setPainter = function(painter){
		this_.painter = painter;
	}
	
	this_.save = function(){
		var dataURL = this_.canv_element.toDataURL();
		open().document.write('<img src="'+dataURL+'"/>');
	}
	
	
	var downEvent=((document.ontouchstart!==null)?'mousedown':'touchstart');
	var moveEvent=((document.ontouchmove!==null)?'mousemove':'touchmove');
	var upEvent=((document.ontouchstart!==null)?'mouseup':'touchend');
	
	var downCallback = (downEvent=='mousedown') ? mousedown : touchdown;
	var moveCallback = (moveEvent=='mousemove') ? mousemove : touchmove;
	var upCallback = (upEvent=='mouseup') ? mouseup : touchup;
	
	this_.init(x,y);
};

