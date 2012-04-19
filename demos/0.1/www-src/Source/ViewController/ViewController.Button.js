/*
---

name: ViewController.Button

description:

license:

authors:
	- Your name

requires:

provides:
	- ViewController.Button

...
*/

if (!window.ViewController) window.ViewController = {};

ViewController.Button = new Class({

	Extends: Moobile.ViewController,

	navigationBar: null,

	navigationBarItem: null,

	backButton: null,

	tempButton: null,

	styleList: null,

	loadView: function() {
		this.view = Moobile.View.at('templates/views/control-button-view.html');
	},

	viewDidLoad: function() {

		this.navigationBar = this.view.getChildComponent('navigation-bar');
		this.navigationBarItem = this.navigationBar.getItem();

		this.tempButton = this.navigationBarItem.getChildComponent('temp-button');
		this.backButton = this.navigationBarItem.getChildComponent('back-button');
		this.backButton.addEvent('tap', this.bound('onBackButtonTap'));

		this.styleList = this.view.getChildComponent('style-list');
		this.styleList.addEvent('select', this.bound('onStyleListSelect'));
	},

	destroy: function() {

		this.navigationBar = null;
		this.navigationBarItem = null;

		this.backButton.removeEvent('tap', this.bound('onBackButtonTap'));
		this.backButton = null;
		this.tempButton = null;

		this.styleList.removeEvent('select', this.bound('onStyleListSelect'));
		this.styleList = null;

		this.parent();
	},

	onBackButtonTap: function() {
		this.getViewControllerStack().popViewController();
	},

	onStyleListSelect: function(item) {
		this.tempButton.setStyle(item.getName());
	}

});