function subclassOf(base) {
    _subclassOf.prototype= base.prototype;
    return new _subclassOf();
}
function _subclassOf() {};
function UIInput(x,y,id,onclick){
	UIElement.call(this,x,y,id);
	this.onclick = onclick;
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


$(document).ready(function(){
	var cb = function(){alert('hello');};
	var button = new Button(
							30,
							400,
							'button',
							function(){alert('hello')}
						);
});
