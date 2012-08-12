/*
 * UIElement.js
 *
 * Description: Bass class for all UI elements that support user interaction.
 *
 */



UIInput.prototype = new UIElement();

function UIInput(x,y,id,onclick){
	var this_ = this;
	
	UIElement.call(this_,x,y,id);
	this_.onclick = onclick || {};
	
	this_.enable = function(){
		this_.enabled = true;
		$('#'+this_.id).click(this_.onclick);
	};
	
	this_.disable = function(){
		this_.enabled = false;
		$('#'+this_.id).unbind('click');
	};

};