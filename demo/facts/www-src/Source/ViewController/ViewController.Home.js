/*
---

name: ViewController.Home

description:

license:

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:

provides:
	- ViewController.Home

...
*/

if (!window.ViewController) window.ViewController = {};

ViewController.Home = new Class({

	Extends: Moobile.ViewController,

	navigationBar: null,

	navigationBarItem: null,

	addButton: null,

	list: null,

	loadView: function() {
		this.view = Moobile.View.at('templates/views/home-view.html');
	},

	viewDidLoad: function() {
		this.navigationBar = this.view.getChildComponent('navigation-bar');
		this.navigationBarItem = this.navigationBar.getItem();
		this.addButton = this.navigationBarItem.getButton('add-button');
		this.addButton.addEvent('tap', this.bound('onAddButtonTap'));
		this.list = this.view.getChildComponent('fact-list');
		this.list.addEvent('select', this.bound('onListItemSelect'));
	},

	viewWillEnter: function() {
		this.refresh();
	},

	willDismissModalViewController: function() {
		this.refresh();
	},

	refresh: function() {
		var facts = LocalStorage.get('facts');
		if (facts.length) {
			this.list.removeAllItems();
			facts.each(function(fact) {
				var item = new Moobile.ListItem();
				item.setStyle('disclosed');
				item.setLabel(fact.title);
				this.list.addItem(item);
			}, this);
		} else {
			this.listEmptyText.show();
		}
		return this;
	},

	onAddButtonTap: function() {
		this.presentModalViewController(new ViewController.Add);
	},

	onListItemSelect: function(item) {
		var index = this.list.getChildComponentIndex(item);
		console.log(index);
		if (index > -1) {
			var fact = LocalStorage.get('facts')[index];
			if (fact) {
				var viewController = new ViewController.Fact();
				viewController.setFact(fact)
				this.getViewControllerStack().pushViewController(viewController, new Moobile.ViewTransition.Slide);
			}
		}
	}

});