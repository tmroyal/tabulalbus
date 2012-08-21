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
		brushDisplaySize = 50,
		brushDisplayPadding = 15,
		buttons=[];
	this_.x = x;
	this_.y = y;
	this_.id = id;
	
	var setBrush_callback = function(ind){
		return function(e){painter.setBrush(brushes[ind]);};
	};
	
	var addButtons = (function(brushes){
		for (var i=0; i < brushes.length; i++) {
			var tx = x+i*(brushDisplaySize+SPACING);

			// buttons is an array that is appended to
			// using the push function
			buttons.push( 
				new Button( tx, 
							y, 
							this_.id+String(i), 
							setBrush_callback(i),
							brushDisplaySize,
							brushDisplaySize
							) 
			);
			
			buttons[i].addImage(
				tx+brushDisplayPadding/2, 
				y+brushDisplayPadding/2, 
				brushes[i].img_uri, 
				brushDisplaySize-brushDisplayPadding, 
				brushDisplaySize-brushDisplayPadding
			);
		};
	})
	
	addButtons(brushes_);
};