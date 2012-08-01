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
			.attr('height', this_.w)
			.attr('width', this_.h)
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

		this_.brush.dropBrush(x,y,this_.canvas);

		$('body').bind('mousemove',this_.mousemove);
		$('body').bind('mouseup',this_.mouseup);
	};
	
	this_.mousemove = function(e){
		var x = e.pageX-this_.canv_element.offsetLeft;
		var y = e.pageY-this_.canv_element.offsetTop;
		
		//this_.canvas.beginPath();
		// this_.canvas.moveTo(this_.oldX,this_.oldY);
		// this_.canvas.lineTo(newX,newY);
		// this_.canvas.stroke();
		// 
		// this_.oldX = newX;
		// this_.oldY = newY;
		this_.brush.moveBrush(x,y,this_.canvas);
	};
	
	this_.mouseup = function(e){
		$('body').unbind('mousemove');
		$('body').unbind('mouseup');
	}
	
	this_.setBrush = function(brush){
		this_.brush = brush
	}
	
	this_.init(x,y);
};

