function Button(x,y,id,onclick){
	UIInput.call(this,x,y,id,onclick)
	// 
	// 
	// 
	// this.enable = function(){
	// 	this.enabled = true;
	// 	$('#'+this.id).click(this.onclick);
	// };
	// 
	// this.disable = function(){
	// 	this.enabled = false;
	// 	$('#'+this.id).unbind('click');
	// };
	// 
	// 
	// 
	// this.print = function(){
	// 	console.log("button "+this.id+" at "+this.x+","+this.y)
	// }
	
	this.init(x,y);
};

Button.prototype = new UIInput();

Button.prototype.init = function(x,y){
	$('<div/>',{
		'class': 'button bordered',
		'id': this.id
	}).appendTo('body');
	
	this.setPosition(x,y);
	$('#'+this.id).click(this.onclick);
};