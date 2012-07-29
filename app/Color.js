function Color(h,s,v){	
	this.h = h;
	this.s = s;
	this.v = v;
	this.color = this.HSVtoRGB(this.h,this.s,this.v);
	alert(this.color);
}

Color.prototype.setH = function(h) {
	this.h = h;
};
Color.prototype.setS = function(s) {
	this.s = s;
};	
Color.prototype.setV = function(v) {
	this.v = v;
};

Color.prototype.HSVtoRGB = function(h, s, v){
    // courtesy http://mjijackson.com/
	var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}
