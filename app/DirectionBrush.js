DirectionBrush.prototype = new Brush();

function DirectionBrush(uri, size){
	Brush.call(this,uri,0,size);
	var this_ = this;
	
	this_.draw = function(canvas){
		this_;
		
		// iterate through points made in moveCursor, and write to canvas 
	};
	
	this_.stamp = function(canvas){
		// write once (or multitimes) for random
	}
	
};
