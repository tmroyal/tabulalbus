
function Color(h,s,v){
	
	this.h = h;
	this.s = s;
	this.v = v;
	this.color = this.HSVtoRGB(this.h,this.s,this.v);
	this.callbacks = [];	

	this.setH = function(h) {
		this.h = h;
		this.update_color();
	};
}
Color.prototype.setS = function(s) {
	this.s = s;
	this.update_color();
};	
Color.prototype.setV = function(v) {
	console.log(this);
	v = v;
	Color.update_color();
};


Color.prototype.update_color = function() {
	this.color = this.HSVtoRGB(this.h,this.s,this.v);
	for (i in this.callbacks){
		this.callbacks[i](this.color);
	}
};


Color.prototype.HSVtoRGB = function(h, s, v){
    // courtesy http://mjijackson.com/
	var r1, g1, b1;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r1 = v, g1 = t, b1 = p; break;
        case 1: r1 = q, g1 = v, b1 = p; break;
        case 2: r1 = p, g1 = v, b1 = t; break;
        case 3: r1 = p, g1 = q, b1 = v; break;
        case 4: r1 = t, g1 = p, b1 = v; break;
        case 5: r1 = v, g1 = p, b1 = q; break;
    }
    return {r:r1 * 255, g:g1 * 255, b:b1 * 255};
}

Color.prototype.add_callback = function(callback) {
	this.callbacks.push(callback);
};
