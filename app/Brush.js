/*
 * Brush.js
 *
 * Description: stores brush image and 'stamps' painter with brush of specified size.
 *
 *
 */


function Brush(druri, drpuri){
	var this_ = this,
		drag_img_loaded = false,
		drop_img_loaded = false;

	this_.img_uri = druri;

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
	
	this_.stamp = function(canvas, scaling){
		canvas.save(); 
		canvas.translate(50, 50);//what are the proper x and y
		canvas.scale(scaling,scaling);
		canvas.drawImage(this_.drag_img, -this_.drag_img.width/2, -this_.drag_img.height/2);
		canvas.restore();
	}
};