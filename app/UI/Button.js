/*
 * Button
 *
 * Description: Class for a button. 
 *
 *
 */



Button.prototype = UIInput();

function Button(x,y,id,onclick,w,h){
	var this_ = this;
	var clickEventType=((document.ontouchstart!==null)?'click':'touchstart');
	
	UIInput.call(this,x,y,id,onclick);
	this_.w = w;
	this_.h = h;
		
	this_.init = function(x,y){
		$('<div/>',{
			'class': 'button bordered',
			'id': this.id
		}).appendTo('body');
	
		this.setPosition(x,y);
		
		$('#'+this_.id).bind(clickEventType,this_.onclick);
		
		if(this_.w || this_.h){
			$('#'+this_.id).css({
				'width':this_.w,
				'height':this_.h
			});
		}
	};
	
	this_.init(x,y);
};
