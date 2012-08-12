/*
 * Painter.js
 *
 * Description: A surface for displaying the brush and a canvas element that
 *				serves to enables drawing to the canvas. Hideable to support
 *				multiple-users.
 */

Painter.prototype = UIElement();

function Painter(x,y,id,color,init_brush, spacing_perc, size){
	var this_=this,
		current_dist = 0,
		scaling = size/100.0,
		spacing = size*spacing_perc,
		prev_x,
		prev_y;
		
	UIElement.call(this_,x,y,id);
	this_.curcolor = color;
	this_.brush = init_brush;

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
		$('#' + this_.id).css({
			'border-style':'solid',
			'border-color': '#6e6e6e',
			'border-width': '2px',
			'border-radius': '10px'
		});
	
		this_.setPosition(x,y);
	};
	this_.init(x,y);

	this_.hide= function(){
		$('#'+this_.id).hide();
	}
	this_.show = function(){
		$('#'+this_.id).show();
	}

	this_.updateColor = function(color) {
		this_.canvas.clearRect(0,0);
		this_.brush.stamp(this_.canvas,scaling);
	    
		Caman("#"+id, function () {
		    this.colorize(color.r,color.g,color.b,100).render();
		});
		this_.brush.drawing = this_.canvas_element;

	};

	this_.canvas_element = document.getElementById(this_.id)
	this_.canvas = this_.canvas_element.getContext('2d');
	
	this_.dropBrush = function(x,y,canvas){
		prev_x = x;
		prev_y = y;
		//draw(prev_x,prev_y,Math.random(Math.pi*2),canvas,this_.drop_img);
	};
	
	this_.moveBrush = function(x,y,canvas){
		var dist_ang = getDistAndAngle(x,y);
		 
		current_dist+=dist_ang.dist;
		
		if(current_dist>spacing){
			//draw(x,y,dist_ang.ang,canvas,this_.drag_img);
			draw(x,y,dist_ang.ang,canvas,this_.canvas_element);
		}
		while (current_dist>spacing){
			var draw_x = prev_x+current_dist*Math.cos(dist_ang.ang),
				draw_y = prev_y+current_dist*Math.sin(dist_ang.ang);
			current_dist -= spacing;
			//draw(draw_x,draw_y,dist_ang.ang,canvas,this_.drag_img);
			draw(draw_x,draw_y,dist_ang.ang,canvas,this_.canvas_element);
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
	
	this_.setScaling = function(size){
		scaling = size/100.0;
	};
	
	var draw = function(x,y,ang,canvas,img){
		canvas.save(); 
        canvas.globalAlpha = 0.2;
		canvas.translate(x, y);
		canvas.rotate(ang);
		//canvas.scale(scaling,scaling);
		canvas.drawImage(img,-img.width/2,-img.height/2);
		canvas.restore();        
	};
};
