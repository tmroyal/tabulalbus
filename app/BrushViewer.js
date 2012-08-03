BrushViewer.prototype = UIElement();

function BrushViewer(x,y,id,color,brush){
	var this_=this;
	UIElement.call(this_,x,y,id);
	this_.curcolor = color;
	this_.brush = brush;

	this_.setBrush = function(brush){
		this_.brush = brush;
		this_.updateColor(this_.curcolor);
	};

	this_.init = function(x,y) {
		$('<canvas/>', {
			'id': this_.id
		})
		.appendTo('body')
		$('#' + this_.id).attr('height', 100).attr('width', 100);
		$('#' + this_.id).css({'border-style':'solid',
		'border-color': '#6e6e6e',
		'border-width': '2px',
		'border-radius': '10px'});
	
		this_.setPosition(x,y);
	};
	this_.init(x,y);

	this_.hide(){
		$('#'+this_.id).hide();
	}
	this_.show(){
		$('#'+this_.id).show();
	}

	this_.updateColor = function(color) {
		this_.canvas.clearRect(0,0);
		this_.brush.stamp(this_.canvas);
	    
		Caman("#"+id, function () {
		    this.colorize(color.r,color.g,color.b,100).render();
		});
		this_.brush.drawing = this_.canvas_element;

	};

	this_.canvas_element = document.getElementById(this_.id)
	this_.canvas = this_.canvas_element.getContext('2d');
	
};
