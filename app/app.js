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
