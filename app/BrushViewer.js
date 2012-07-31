BrushViewer.prototype = UIElement();

function BrushViewer(x,y,id){
	var this_=this;
	UIElement.call(this_,x,y,id);

	this_.init = function(x,y) {
		$('<canvas/>', {
			'id': this_.id,

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


	this_.updateColor = function(color) {
		// $('#'+this_.id).css({
		// 			'background-color': 'rgb('+color.r+','+color.g+','+color.b+')'
		// 		});
		this_.canvas.clearRect(0,0,100,100);
		this_.canvas.drawImage( img, 0, 0 );
	    
		Caman("#"+id, function () {
		    this.colorize(color.r,color.g,color.b,100).render();
		});
	};
	
	// to do this, we will get the white image
	// and then do the imgproc stuff from play my code
	// and then use the brush viewer canvas to store the image(?)
	

	this_.canvas = document.getElementById(this_.id).getContext('2d');
	var img = new Image();
	
	img.onload=function(){

	    this_.canvas.drawImage( img, 0, 0 );
		Caman("#"+id, function () {
		    this.colorize(255,0,0,100).render();
		});
	};
	

	img.src='./img/markerw.png';
	
	//this_.canvas.fillRect(0,0,100,100);

};
