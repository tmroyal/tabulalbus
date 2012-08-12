$(document).ready(function(){
	var brush = new Brush('./img/longBrush.png','./img/longBrushDown.png');
	var clr = new Color(0,0,0,'color');
	var cp = new ColorPicker(40,460,'cp',clr);
	var	brush_viewer = new Painter(240,460,'bview',clr,brush,0.2,40);
	
	//brush_viewer.updateColor({r:230,g:100,b:120});
	//clr.add_callback(brush_viewer.updateColor);
	clr.add_callback(cp.setIndicator);
	clr.add_broadcastee(brush_viewer.updateColor);
	cp.set_pos(0,1,1); 
	
	var surface = new Surface(40,40,800,400,'surface');
	//roung 0.2
	//thin 0.6
	//long 0.2

	
	surface.setPainter(brush_viewer);
	
});
