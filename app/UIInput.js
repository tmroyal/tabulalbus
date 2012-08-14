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
	this_.onclick = onclick; //|| function(){console.log("unused callback"+this_.id)};
	
	this_.enable = function(){
		this_.enabled = true;
		$('#'+this_.id).click(this_.onclick);
	};
	
	// this_.disable = function(){
	// 	this_.enabled = false;
	// 	$('#'+this_.id).unbind('click');
	// };
	// 
	this_.addImage = function(x,y,uri,w,h) {
		if (w || h){
			$('<img/>',{
				'src' : uri
			}).appendTo('body').css({
				'top' : y,
				'left' : x,
				'width' : w,
				'height' : h
			}).click(this_.onclick);	
		}else{
			$('<img/>',{
				'src' : uri
			}).appendTo('body').css({
				'top' : y,
				'left' : x
			}).click(this_.onclick);
		};
	};

};