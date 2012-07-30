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

