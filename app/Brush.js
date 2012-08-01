function Brush(druri, drpuri, spacing_perc, size){
	var this_ = this,
		drag_img_loaded = false,
		drop_img_loaded = false,
		scaling = size/100.0,
		current_dist = 0,
		spacing = size*spacing_perc,
		prev_x,
		prev_y;

	this_.drag_img = new Image();
	this_.drag_img.onload = function(){
		drag_img_loaded = true;
	};
	this_.drag_img.src = druri;
	
	this_.drop_img = new Image();
	this_.drop_img.onload = function(){
		drop_img_loaded = true;
	};
	this_.drop_img.src = drpuri;
	
	this_.notloaded = function(){
		return (drop_img_loaded == false) || (drag_img_loaded == false);	
	};
	
	this_.dropBrush = function(x,y,canvas){
		prev_x = x;
		prev_y = y;
		draw(prev_x,prev_y,Math.random(Math.pi*2),canvas,this_.drop_img);
	};
		
	this_.moveBrush = function(x,y,canvas){
		var dist_ang = getDistAndAngle(x,y);
		 
		current_dist+=dist_ang.dist;
		
		if(current_dist>spacing){
			draw(x,y,dist_ang.ang,canvas,this_.drag_img);
		}
		while (current_dist>spacing){
			var draw_x = prev_x+current_dist*Math.cos(dist_ang.ang),
				draw_y = prev_y+current_dist*Math.sin(dist_ang.ang);
			current_dist -= spacing;
			draw(draw_x,draw_y,dist_ang.ang,canvas,this_.drag_img);
			//draw(draw_x,draw_y,Math.random(Math.pi*2),canvas,this_.drag_img);
		}
		prev_x = x;
		prev_y = y;
	};
	
	var getDistAndAngle = function(x,y){
		var dx = x-prev_x,
			dy = y-prev_y;
		return {dist:Math.sqrt(dx*dx+dy*dy),ang:Math.atan2(dy,dx)};
	};

	this_.stamp = function(canvas){
		canvas.save(); 
		canvas.translate(50, 50);//what are the proper x and y
		canvas.scale(scaling,scaling);
		canvas.drawImage(this_.drag_img, -this_.drag_img.width/2, -this_.drag_img.height/2);
		canvas.restore();
		if(drag_img_loaded==false){console.log('theres the problem');}
	}

	this_.setScaling = function(size){
		scaling = size/100.0;
	};
	
	var draw = function(x,y,ang,canvas,img){
		canvas.save(); 
		canvas.translate(x, y);
		canvas.rotate(ang);
		canvas.scale(scaling,scaling);
		canvas.drawImage(img,-img.width/2,-img.height/2);
		canvas.restore();
	};
	
};