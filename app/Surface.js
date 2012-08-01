Surface.prototype = new UIElement();

function Surface(x,y,w,,h,id){
	var this_ = this;
	UIElement.call(this,x,y,id);
	this_.w = w;
	this_.h = h;
	
	this_.init(x,y) = function(x,y){
		$('<canvas/>',{
			'id':id
		}).appendTo('body');
		$('#' + this_.id).attr('height', this_.w).attr('width', this_.h);
		
		$('#' + this_.id).css({
			'border-style':'solid',
			'border-color': '#6e6e6e',
			'border-width': '2px',
		});
		
		this_.setPosition(x,y);
	}
	
	this_.init(x,y);
};

