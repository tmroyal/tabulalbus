function Brush(uri,spacing, size){
	var this_ = this,
		loaded = false,
		scaling = size/100.0,
		current_dist = 0,
		prev_x,
		prev_y;

	this_.img = new Image();
	this_.img.onload = function(){
		this_.loaded = true;
	};
	this_.img.src = uri;
	
	this_.dropBrush = function(x,y){
		prev_x = x;
		prev_y = y;
	};
		
	this_.moveBrush = function(x,y,canvas){
		var dist_ang = getDistAndAngle(x,y);
		 
		current_dist+=dist_ang.dist;

		while (current_dist>spacing){
			var draw_x = prev_x+current_dist*Math.cos(dist_ang.ang);
			var draw_y = prev_y+current_dist*Math.sin(dist_ang.ang);
			current_dist -= spacing;
			draw(draw_x,draw_y,dist_ang.ang,canvas);
		}
		draw(x,y,dist_ang.ang,canvas);

		prev_x = x;
		prev_y = y;
	};
	
	var getDistAndAngle = function(x,y){
		var dx = x-prev_x;
		var dy = y-prev_y;
		return {dist:Math.sqrt(dx*dx+dy*dy),ang:Math.atan2(dy,dx)};
	};

	this_.stamp = function(canvas){
		canvas.save(); 
		canvas.translate(x, y);
		// this_.canvas.rotate(angle * TO_RADIANS); seen in overridden methods
		canvas.scale(this_.size/100);
		canvas.drawImage(this_.img, -(scaling*this_.img.width/2), -(scaling*this_.img.height/2));
		canvas.restore();
	}

	this_.setScaling = function(size){
		scaling = size/100.0;
	};
	
	var draw = function(x,y,ang,canvas){
		canvas.save(); 
		canvas.translate(x, y);
		// this_.canvas.rotate(angle * TO_RADIANS); seen in overridden methods
		canvas.scale(scaling,scaling);
		canvas.drawImage(this_.img, -(scaling*this_.img.width/2), -(scaling*this_.img.height/2));
		canvas.restore();
	};
	
};