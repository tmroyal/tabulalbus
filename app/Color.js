
function Color(h,s,v){
	var this_ = this;
	
	this_.h = h;
	this_.s = s;
	this_.v = v;
	this_.callbacks = [];	

	this_.setH = function(h) {
		this_.h = h;
		this_.update_color();
	};

	this_.setS = function(s) {
		this_.s = s;
		this_.update_color();
	};	
	this_.setV = function(v) {
		this_.v = v;
		this_.update_color();
	};

	this_.update_color = function() {
		this_.color = this_.HSVtoRGB(this_.h,this_.s,this_.v);
		for (i in this_.callbacks){
			this_.callbacks[i](this_.color);
		}
	};
	
	this_.apply_color = function(cb){
		cb(this_.color);
	}

	this_.HSVtoRGB = function(h, s, v){
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
	    return {
			r:Math.floor(r1 * 255), 
			g:Math.floor(g1 * 255), 
			b:Math.floor(b1 * 255)
				};
	}

	this_.add_callback = function(callback) {
		this_.callbacks.push(callback);
	};
	
	this_.color = this_.HSVtoRGB(this.h,this.s,this.v);
};
