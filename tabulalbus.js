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


function HSliderButton(x,y,id){
	UIInput.call(this,x,y,id,{});
	this.init(x,y);
}

HSliderButton.prototype = subclassOf(UIInput);

HSliderButton.prototype.init = function(x,y) {
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	
	$('#'+this.id).bind('mousedown',this,this.mouseDown)	
};

HSliderButton.prototype.mouseMove = function(e){
	e.data.setPosition(e.pageX-15,e.pageY-15);
};

HSliderButton.prototype.mouseUp = function(e){
	$('body').unbind('mouseup');
	$('#'+e.data.id).unbind('mousemove');	
};


HSliderButton.prototype.mouseDown = function(e) {
	$('#'+e.data.id).bind('mousemove',e.data,e.data.mouseMove);
	$(document).bind('mouseup',e.data,e.data.mouseUp);
};





$(document).ready(function(){
	var cb = function(){alert('hello');};
	var button = new Button(
							30,
							400,
							'button',
							function(){alert('hello')}
						);
	var slButton = new HSliderButton(20,20,'slider_button');
});
