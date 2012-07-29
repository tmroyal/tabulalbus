function UIElement(x,y,id){
	this.x = x;
	this.y = y;
	this.id = id;
}

UIElement.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
	$('#'+this.id).css({
		'top': this.y+'px',
		'left': this.x+'px'
	});
};

