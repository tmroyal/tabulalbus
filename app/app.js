$(document).ready(function(){
	var clr = new Color(0,1,1,'color');
	var cp = new ColorPicker(20,20,'cp',clr);
	var	brush_viewer = new BrushViewer(200,10,'bview');
	
	
	//brush_viewer.updateColor({r:230,g:100,b:120});
	//clr.add_callback(brush_viewer.updateColor);
	clr.add_callback(cp.setIndicator);
});
