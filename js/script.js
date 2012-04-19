/* Author:

*/

(function(){

Browser.Device = {
	name: 'other'
};

if (Browser.Platform.ios){
	var device = navigator.userAgent.toLowerCase().match(/(ip(ad|od|hone))/)[0];

	Browser.Device[device] = true;
	Browser.Device.name = device;
}

if (this.devicePixelRatio == 2)
	Browser.hasHighResolution = true;

Browser.isMobile = !['mac', 'linux', 'win'].contains(Browser.Platform.name);

}).call(this);

window.addEvent('domready', function() {

	window.addEvent('scroll', function(e) {
		var header = document.getElement('.main-header-back');
		var scroll = window.getScroll().y;
		if (scroll > 75) {
			header.addClass('emphasize');
		} else {
			header.removeClass('emphasize');
		}
	});

	if (Browser.isMobile) {
		document.getElements('.mobile').setStyle('display', 'block');
		document.getElements('.desktop').setStyle('display', 'none');
	} else {
		document.getElements('.mobile').setStyle('display', 'none');
		document.getElements('.desktop').setStyle('display', 'block');
	}

});
