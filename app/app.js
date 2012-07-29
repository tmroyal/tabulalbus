$(document).ready(function(){
	var cb = function(){alert('hello');};
	var button = new Button(
							30,
							400,
							'button',
							function(){alert('hello');}
						);
						
	var cb = function(x){
		$('#sliderbtn').css({
			'background-color' : 'rgb(255,0,'+Math.round(x*250)+')'}
      	);
	}
	var slButton = new Slider(50,20,100,'slider',cb,'body');
});
