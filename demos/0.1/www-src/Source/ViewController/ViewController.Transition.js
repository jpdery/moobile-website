/*
---

name: ViewController.Transition

description:

license:

authors:
	- Your name

requires:

provides:
	- ViewController.Transition

...
*/

if (!window.ViewController) window.ViewController = {};

ViewController.Transition = new Class({

	Extends: Moobile.ViewController,

	backButton: null,

	loadView: function() {
		this.view = Moobile.View.at('templates/views/transition-view.html');
	},

	viewDidLoad: function() {
		this.backButton = this.view.getChildComponent('back-button');
		this.backButton.addEvent('tap', this.bound('onBackButtonTap'));
	},

	destroy: function() {
		this.backButton.removeEvent('tap', this.bound('onBackButtonTap'));
		this.backButton = null;
		this.parent();
	},

	onBackButtonTap: function() {
		this.getViewControllerStack().popViewController();
	}

});