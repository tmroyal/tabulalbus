$(document).ready(function(){
	var cb = function(){alert('hello');};
	var button = new Button(
							30,
							400,
							'button',
							function(){alert('hello')}
						);
	var slButton = new HSliderButton(100,20,100,'slider_button',function(x){console.log(x)});
});
