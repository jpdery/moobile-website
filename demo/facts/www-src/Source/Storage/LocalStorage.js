/*
---

name: LocalStorage

description:

license:

authors:
	- Christoph Pojer (@cpojer)

requires:

provides:
	- LocalStorage

...
*/

(function(){

var storage, set, get, erase;
if ('localStorage' in this) {
	storage = this.localStorage;
	set = function(key, value){
		storage.setItem(key, JSON.encode(value));
		return this;
	};

	get = function(key){
		return JSON.decode(storage.getItem(key));
	};

	erase = function(key){
		storage.removeItem(key);
		return this;
	}.overloadGetter();
} else {
	storage = this.Cookie;
	set = function(key, value){
		storage.write(key, JSON.encode(value));
		return this;
	};

	get = function(key){
		return JSON.decode(storage.read(key));
	};

	erase = function(key){
		storage.dispose(key);
		return this;
	}.overloadGetter();
}

this.LocalStorage = {
	set: set.overloadSetter(),
	get: get.overloadGetter(),
	erase: function(){
		erase.apply(this, arguments);
		return this;
	}
};

})();