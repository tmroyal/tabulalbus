function BrushViewer(x,y,id){
	UIElement.call(this,x,y,id);
	this.init(x,y);
	
};

BrushViewer.prototype = subclassOf(UIElement);

BrushViewer.prototype.init = function(x,y) {
	$('<div/>', {
		'id': this.id
	})
	.appendTo('body')
	.css({
		'class' : 'bordered',
		'width' : '50px',
		'height': '50px'
	})
	
	this.setPosition(x,y);
};


BrushViewer.prototype.updateColor = function(color) {
	$('#'+this.id).css({
		'background-color': 'rgb('+color.r+','+color.g+','+color.b+')'
	});
};
