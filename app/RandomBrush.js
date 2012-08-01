RandomBrush.prototype = new Brush();

function RandomBrush(uri, size){
	Brush.call(this,uri,0,size);
	var this_ = this;
	
	this_.write = function(canvas){
		this_;
		
		// iterate through points made in moveCursor, and write to canvas 
	};
	
	this_.writePrototype = function(canvas){
		// write once (or multitimes) for random
	}
	
};

