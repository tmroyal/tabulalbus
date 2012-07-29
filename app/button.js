function Button(x,y,id,onclick){
	UIInput.call(this,x,y,id,onclick)
	this.init(x,y);
};

Button.prototype = subclassOf(UIInput);

Button.prototype.init = function(x,y){
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	$('#'+this.id).click(this.onclick);
};

