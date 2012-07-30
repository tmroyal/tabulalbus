BrushViewer.prototype = UIElement();

function BrushViewer(x,y,id){
	var this_=this;
	UIElement.call(this_,x,y,id);

	this_.init = function(x,y) {
		$('<div/>', {
			'id': this_.id
		})
		.appendTo('body')
		.css({
			'class' : 'bordered',
			'width' : '50px',
			'height': '50px'
		})
	
		this_.setPosition(x,y);
	};


	this_.updateColor = function(color) {
		$('#'+this_.id).css({
			'background-color': 'rgb('+color.r+','+color.g+','+color.b+')'
		});
	};
	
	this_.init(x,y);
};
