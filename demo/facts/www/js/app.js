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
