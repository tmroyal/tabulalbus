
$(document).ready(function(){
	
	// brushes
	var lngbrush = new Brush('./img/longBrush.png','./img/longBrushDown.png');
	var rndbrush = new Brush('./img/roundBrush.png','./img/roundBrush.png');
	var thnbrush = new Brush('./img/thinBrush.png','./img/thinBrush.png');
	var msybrush = new Brush('./img/messyBrush.png','./img/messyBrush.png');
	
	var brushes = [lngbrush,rndbrush,thnbrush,msybrush];
	
	var clr = new Color(0,0,0,'color');
	var cp = new ColorPicker(40,460,'cp',clr);
	var	painter = new Painter(240,460,'bview',clr,lngbrush,0.05,40);
	
	//brush_viewer.updateColor({r:230,g:100,b:120});
	//clr.add_callback(brush_viewer.updateColor);
	clr.add_callback(cp.setIndicator);
	clr.add_broadcastee(painter.updateColor);
	cp.set_pos(0,1,1); 
	
	var surface = new Surface(40,40,725,400,'surface');
	//roung 0.2
	//thin 0.6
	//long 0.2
	var brushSizeSlider = new BrushSizeSlider(360,535,200,'brSzSl',painter).set(0.5);
	
	var brushSelector = new BrushSelector(360,460,'brsel',painter,brushes);
	
	var saveButton = new Button(660,460,'svbtn',surface.save,100,100)
	saveButton.addImage(675,473,'./img/save.png');
	saveButton.addImage(625,490,'./img/saveimage.png');
	surface.setPainter(painter);
	
	
});
