function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
function UIInput(x,y,id,onclick){
	UIElement.call(this,x,y,id);
	this.onclick = onclick || {};
};

UIInput.prototype = subclassOf(UIElement);

UIInput.prototype.enable = function(){
	this.enabled = true;
	$('#'+this.id).click(this.onclick);
};

UIInput.prototype.disable = function(){
	this.enabled = false;
	$('#'+this.id).unbind('click');
};
function UIElement(x,y,id){
	this.x = x;
	this.y = y;
	this.id = id;

}

UIElement.prototype.setPosition = function(x,y) {
	this.x = x;
	this.y = y;
	$('#'+this.id).css({
		'top': this.y+'px',
		'left': this.x+'px'
	});
};


function Button(x,y,id,onclick){
	UIInput.call(this,x,y,id,onclick)
	this.init(x,y);
};

Button.prototype = subclassOf(UIInput);

Button.prototype.init = function(x,y){
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	$('#'+this.id).click(this.onclick);
};


function HSliderButton(x,y,range,id,callback){
	UIInput.call(this,x,y,id,{});
	this.init(x,y);
	this.x1 = x;
	this.x2 = x+range;
	this.range = range;
	// callback sould take a range of zero to one (float)
	this.callback = callback || {};
}

HSliderButton.prototype = subclassOf(UIInput);

HSliderButton.prototype.init = function(x,y) {
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	
	// object must be passed because jQuery does not support 
	// using the this keyword for objects. this in the context of
	// events reffers to the parent element
	$('#'+this.id).bind('mousedown',this,this.mouseDown);
};

HSliderButton.prototype.mouseMove = function(e){
	var sbutton = e.data,
		new_x = e.pageX-15;

	if(new_x > sbutton.x1 && new_x < sbutton.x2){
		sbutton.setPosition(new_x,sbutton.y);
		sbutton.callback((sbutton.x-sbutton.x1)/sbutton.range);
	} else if(new_x < sbutton.x1){
		sbutton.setPosition(sbutton.x1,sbutton.y);
		sbutton.callback(0);
	} else if(new_x > sbutton.x2){
		sbutton.setPosition(sbutton.x2,sbutton.y);
		sbutton.callback(1);
	}
};

HSliderButton.prototype.mouseUp = function(e){
	var sbutton = e.data;

	$(document).unbind('mouseup');
	$(document).unbind('mousemove');

	sbutton.setPosition(e.pageX,sbutton.y);
	sbutton.callback((sbutton.x-sbutton.x1)/sbutton.range);	
};


HSliderButton.prototype.mouseDown = function(e) {
	var sbutton = e.data;
	$(document).bind('mousemove',sbutton,sbutton.mouseMove);
	$(document).bind('mouseup',sbutton,sbutton.mouseUp);
};

$(document).ready(function(){
	var cb = function(){alert('hello');};
	var button = new Button(
							30,
							400,
							'button',
							function(){alert('hello')}
						);
						
	var cb = function(x){
		$('#slider_button').css({
			'background-color' : 'rgb(255,0,'+Math.round(x*250)+')'}
      	);
		console.log(x*250);
	}
	var slButton = new HSliderButton(0,20,400,'slider_button',cb);
});
