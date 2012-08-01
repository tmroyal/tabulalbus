$(document).ready(function(){
	/*
	var clr = new Color(0,0,0,'color');
	var cp = new ColorPicker(20,20,'cp',clr);
	var	brush_viewer = new BrushViewer(200,10,'bview');
	
	
	//brush_viewer.updateColor({r:230,g:100,b:120});
	//clr.add_callback(brush_viewer.updateColor);
	clr.add_callback(cp.setIndicator);
	clr.add_broadcastee(brush_viewer.updateColor);
	cp.set_pos(0,1,1); */
	
	var surface = new Surface(40,40,400,400,'surface');
	var marker = new Brush('./img/marker.png',100*1/10,100);
	
	surface.setBrush(marker);
});
