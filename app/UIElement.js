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

UIElement.prototype.addImage = function(x,y,uri) {
	$('<img/>',{
		'src':uri
	}).appendTo('body').css({
		'top':y+'px',
		'left':x+'px'
	});
};
