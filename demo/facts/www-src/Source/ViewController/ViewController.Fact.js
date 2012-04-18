/*
---

name: ViewController.Fact

description:

license:

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:

provides:
	- ViewController.Fact

...
*/

if (!window.ViewController) window.ViewController = {};

ViewController.Fact = new Class({

	Extends: Moobile.ViewController,

	fact: null,

	titleText: null,

	descrList: null,

	backButton: null,

	setFact: function(fact) {
		this.fact = fact;
		return this;
	},

	getFact: function() {
		return this.fact;
	},

	loadView: function() {
		this.view = Moobile.View.at('templates/views/fact-view.html');
	},

	viewDidLoad: function() {
		this.navigationBar = this.view.getChildComponent('navigation-bar');
		this.navigationBarItem = this.navigationBar.getItem();
		this.backButton = this.navigationBarItem.getButton('back-button');
		this.backButton.addEvent('tap', this.bound('onBackButtonTap'));
		this.titleText = this.view.getChildComponent('title-text');
		this.descrList = this.view.getChildComponent('descr-list');
	},

	destroy: function() {
		this.navigationBar = null;
		this.navigationBarItem = null;
		this.backButton.removeEvent('tap', this.bound('onBackButtonTap'));
		this.backButton = null;
		this.titleText = null;
		this.descrList = null;
	},

	viewWillEnter: function() {
		this.titleText.setText(this.fact.title);
		this.fact.descr.split(/\n/g).each(function(text) {
			text = text.trim();
			if (text) this.descrList.addItem(new Moobile.ListItem().setLabel(text));
		}, this);
	},

	onBackButtonTap: function() {
		this.getViewControllerStack().popViewController();
	}

});