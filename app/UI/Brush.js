/*
 * Brush.js
 *
 * Description: stores brush image and 'stamps' painter with brush of specified size.
 *
 *
 */


function Brush(uri){
	var this_ = this,
		img_loaded = false;
	
	this_.img_uri = uri;	
	
	this_.drag_img = new Image();
	this_.drag_img.onload = function(){
		drag_img_loaded = true;
	};
	this_.drag_img.src = uri;
	
	this_.stamp = function(canvas, scaling){
		canvas.save(); 
		canvas.translate(50, 50);
		canvas.scale(scaling,scaling);
		canvas.drawImage(this_.drag_img, -this_.drag_img.width/2, -this_.drag_img.height/2);
		canvas.restore();
	}
};