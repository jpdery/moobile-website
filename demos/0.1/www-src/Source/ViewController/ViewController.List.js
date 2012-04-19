/*
---

name: ViewController.List

description:

license:

authors:
	- Your name

requires:

provides:
	- ViewController.List

...
*/

if (!window.ViewController) window.ViewController = {};

ViewController.List = new Class({

	Extends: Moobile.ViewController,

	navigationBar: null,

	navigationBarItem: null,

	backButton: null,

	loadView: function() {
		this.view = Moobile.View.at('templates/views/control-list-view.html');
	},

	viewDidLoad: function() {

		this.navigationBar = this.view.getChildComponent('navigation-bar');
		this.navigationBarItem = this.navigationBar.getItem();

		this.backButton = this.navigationBarItem.getChildComponent('back-button');
		this.backButton.addEvent('tap', this.bound('onBackButtonTap'));
	},

	destroy: function() {

		this.navigationBar = null;
		this.navigationBarItem = null;

		this.backButton.removeEvent('tap', this.bound('onBackButtonTap'));
		this.backButton = null;

		this.parent();
	},

	onBackButtonTap: function() {
		this.getViewControllerStack().popViewController();
	}

});