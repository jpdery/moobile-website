/*
---

name: ViewController.Add

description:

license:

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:

provides:
	- ViewController.Add

...
*/

if (!window.ViewController) window.ViewController = {};

ViewController.Add = new Class({

	Extends: Moobile.ViewController,

	saveButton: null,

	cancelButton: null,

	titleInput: null,

	descrInput: null,

	loadView: function() {
		this.view = Moobile.View.at('templates/views/add-view.html');
	},

	viewDidLoad: function() {
		var navigationBarItem = this.view.getChildComponent('navigation-bar').getItem();
		this.saveButton = navigationBarItem.getButton('save-button');
		this.cancelButton = navigationBarItem.getButton('cancel-button');
		this.titleInput = this.view.getElement('.title-input');
		this.descrInput = this.view.getElement('.descr-input');
		this.saveButton.addEvent('tap', this.bound('onSaveButtonTap'));
		this.cancelButton.addEvent('tap', this.bound('onCancelButtonTap'));
	},

	destroy: function() {
		this.saveButton.removeEvent('tap', this.bound('onSaveButtonTap'));
		this.cancelButton.removeEvent('tap', this.bound('onCancelButtonTap'));
		this.saveButton = null;
		this.cancelButton = null;
		this.titleInput = null;
		this.descrInput = null;
	},

	onSaveButtonTap: function() {
		if (this.titleInput.get('value') &&
			this.descrInput.get('value')) {
			var facts = LocalStorage.get('facts');
			facts.push({
				title: this.titleInput.get('value'),
				descr: this.descrInput.get('value')
			});
			LocalStorage.set('facts', facts);
		}
		this.getParentViewController().dismissModalViewController();
	},

	onCancelButtonTap: function() {
		this.getParentViewController().dismissModalViewController();
	}

});