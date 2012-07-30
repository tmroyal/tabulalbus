$(document).ready(function(){

	var clr = new Color(0,1,1,'color');

	var cp = new ColorPicker(20,20,'cp',clr);
	var	brush_viewer = new BrushViewer(400,400,'bview');
	
	clr.add_callback(brush_viewer.update_color);
	
});
