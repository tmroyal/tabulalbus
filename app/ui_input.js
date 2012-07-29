function UIInput(x,y,id,onclick){
	this.x = x;
	this.y = y;
	this.id = id;
	this.onclick = onclick;
};

UIInput.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;
	$('#'+this.id).css({
		'top': this.y+'px',
		'left': this.x+'px'
	});
};