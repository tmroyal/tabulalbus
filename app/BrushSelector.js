/*
 * BrushSelector.ks
 *
 * Description: Displays brush selector buttons, updates painter with user selections
 */

function BrushSelector(x,y,id,painter_,brushes_) {
	var this_ = this,
		painter = painter_,
		brushes = brushes_,
		SPACING = 10,
		b_size = 50,
		b_pad = 15,
		buttons=[];
	this_.x = x;
	this_.y = y;
	this_.id = id;
	
	
	var setBrush_callback = function(ind){
		return function(e){painter.setBrush(brushes[ind]);};
	};
	
	var addButtons = (function(brushes){
		for (var i=0; i < brushes.length; i++) {
			// var cb = function(){
			// 	painter.setBrush(brushes[i]);
			// };
			var tx = x+i*(b_size+SPACING);

			buttons.push( new Button( tx, y, this_.id+String(i), setBrush_callback(i),b_size,b_size) );
			buttons[i].addImage(tx+b_pad/2, y+b_pad/2, brushes[i].img_uri, b_size-b_pad, b_size-b_pad);
		};
	})(brushes_);	
};