$(document).ready(function(){
	var cb = function(){alert('hello');};
	var button = new Button(
							30,
							400,
							'button',
							cb
						);
						
	var cb = function(x){
		$('#sliderbtn').css({
			'background-color' : 'rgb(255,0,'+Math.round(x*250)+')'}
      	);
	}
	var slButton = new Slider(0,20,400,'slider',cb);
});
