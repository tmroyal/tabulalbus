function Brush(uri,spacing, size){
	var this_ = this;
	this_.loaded = false;
	this_.size = size;
	
	this_.img = new Image();
	this_.img.onload = function(){
		this_.loaded = true;
	};
	this_.img = uri;
	
	this_.moveCursor = function(){
		// upon motion, record the number of pixels moved
		// if gt spacing add a point
		// then mod, add pnt, until done
	};
	this_.write = function(canvas){
		this_;
		
		// iterate through points made in moveCursor, and write to canvas 
	};
	
	this_.writePrototype = function(canvas){
		// write once (or multitimes) for random
	}
	this_.reset = function(){
		
	};

	this_.setSize = function(size){
		this_.size = size;
	};
};