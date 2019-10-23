// Copyright 2019 Eric Michael Veilleux - Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. - You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
function cpQuery(query) {
	function select() {
		return document.querySelector(query);
	}
	
	function create() {
		return document.createElement(query);
	}
	
	function css() {
		this.sheet = document.styleSheets[query];
	}
	
	css.prototype.append = function(item) {
		this.sheet.insertRule(item, this.sheet.cssRules.length);
	};
	
	css.prototype.remove = function(item)  {
		this.sheet.deleteRule(item);
	};
	
	css.prototype.replaceWithAll = function() {
		for (var i=0; i<this.sheet.cssRules.length; i++) this.sheet.deleteRule(i);
		for (var i=0; i<arguments.length; i++) this.sheet.insertRule(arguments[i], this.sheet.cssRules.length);
	};
	
	css.prototype.replace = function(item) {
		for (var i=0; i<this.sheet.cssRules.length; i++) this.sheet.deleteRule(i);
		this.sheet.insertRule(item, this.sheet.cssRules.length);
	};

	var element, local = false, session = false;
	if (typeof query == "string") {
		if (["","body","document"].indexOf(query)>-1) element = document;
		else {
			query = query.split("#");
			if (query.length == 2) {
				query = query[1];
				element = document.getElementById(query);
			} else {
				query = query.toString().split(".");
				if (query.length == 2) {
					query = query[1];
					element = document.getElementsByClassName(query);
				} else {
					query = query.toString().split("@");
					if (query.length == 2) {
						query = query[1];
						local = true;
					} else {
						query = query.toString().split("*");
						if (query.length == 2) {
							query = query[1];
							session = true;
						} else element = document.getElementsByTagName(query);
					}
				}
			}
		}
	}

	function checked(value) {
		if (value == undefined) return element.checked;
		element.checked = value;
	}

	function click(code) {
		console.log(element);
		element.addEventListener("click", code);
	}
	
	function val() {
		return element.value;
	}

	function me() {
		if (local) return localStorage.getItem(query);
		else if (session) return sessionStorage.getItem(query);
		return element;
	}

	function set(item) {
		if (local) localStorage.setItem(query, item);
		else if (session) sessionStorage.setItem(query, item);
	}

	function html() {}
	
	html.prototype.append = function(item) {
		element.innerHTML += item;
	}

	html.prototype.replace = function(item) {
		element.innerHTML = item;
	}

	function text() {}
	
	text.prototype.append = function(item) {
		element.textContent += item;
	}

	text.prototype.replace = function(item) {
		element.textContent = item;
	}

	return {
		select: select,
		create: create,
		css: new css(),
		checked: checked,
		click: click,
		val: val,
		me: me,
		set: set,
		html: new html(),
		text: new text()
	}
}

function $(q){return cpQuery(q);}
