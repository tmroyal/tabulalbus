var Button = function(x,y,id,onclick){
	this.id = id;
	this.onclick = onclick || {};

	this.init = function(x,y){
		$('<div/>',{
			'class': 'button bordered',
			'id': this.id
		}).appendTo('body');
		
		this.setPosition(x,y);
		$('#'+this.id).click(this.onclick);
	};
	
	this.enable = function(){
		this.enabled = true;
		$('#'+this.id).click(this.onclick);
	};
	
	this.disable = function(){
		this.enabled = false;
		$('#'+this.id).unbind('click');
	};
	
	this.setPosition = function(x,y){
		this.x = x;
		this.y = y;
		$('#'+this.id).css({
			'top': this.y+'px',
			'left': this.x+'px'
		});
	};
	
	this.print = function(){
		console.log("button "+this.id+" at "+this.x+","+this.y)
	}
	
	this.init(x,y);
};

