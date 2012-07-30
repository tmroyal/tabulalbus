Button.prototype = UIInput();

function Button(x,y,id,onclick){
	var this_ = this;
	
	UIInput.call(this,x,y,id,onclick)
	this_.init(x,y);
	
	this_.init = function(x,y){
		$('<div/>',{
			'class': 'button bordered',
			'id': this.id
		}).appendTo('body');
	
		this.setPosition(x,y);
		$('#'+this.id).click(this.onclick);
	};
};
