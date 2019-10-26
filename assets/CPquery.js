// Copyright 2019 Eric Michael Veilleux - Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. - You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
function cpQuery(query) {
	function css() {
		if (typeof query == "number") this.sheet = document.styleSheets[query];
	}
	
	css.prototype.append = function(item) {
		this.sheet.insertRule(item, this.sheet.cssRules.length);
	};
	
	css.prototype.remove = function(item)  {
		this.sheet.deleteRule(item);
	};
   	
	css.prototype.removeAll = function() {
		for (var i=0; i<this.sheet.cssRules.length; i++) this.sheet.deleteRule(i);
    	}
	
	css.prototype.replaceWithAll = function() {
		for (var i=0; i<this.sheet.cssRules.length; i++) this.sheet.deleteRule(i);
		for (var i=0; i<arguments.length; i++) this.sheet.insertRule(arguments[i], this.sheet.cssRules.length);
	};

	var element, local = false, session = false;
	if (typeof query == "string") {
		if (["","document"].indexOf(query)>-1) element = document;
		else if (query == "head") element = document.head;
		else if (query == "body") element = document.body;
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
	} else if (query == undefined) element = document;
	else element = query;
	
	function select(type, num) {
		if (num != undefined) element = element[num];
		return element.querySelector(type);
	}

	function create(type, num) {
		if (num != undefined) element = element[num];
		var newelem = document.createElement(type);
		element.appendChild(newelem);
	}
    
    	css.prototype.createSheet = function() {
    		element.appendChild(document.createElement("style"));
    	};
    
	function listen(name, code) {
		element.addEventListener(name, code);
	}

	function i(num) {
		if (local) return localStorage.getItem(query);
		else if (session) return sessionStorage.getItem(query);
        	else if (typeof num == "number") return element[num];
		return element;
	}

	function set(item) {
		if (local) localStorage.setItem(query, item);
		else if (session) sessionStorage.setItem(query, item);
	}

	function txt(item, extra1, extra2) {
		var add = typeof extra1 == "boolean" ? extra1:extra2, num = typeof extra1 == "number" ? extra1:extra2;
		if (num != undefined) element = element[num];
		if (add) element.textContent += item;
		else element.textContent = item;
	    }
    
	function htm(item, extra1, extra2) {
		var add = typeof extra1 == "boolean" ? extra1:extra2, num = typeof extra1 == "number" ? extra1:extra2;
		if (num != undefined) element = element[num];
		if (add) element.innerHTML += item;
		else element.innerHTML = item;
	}
    
	function tag(newtag, extra1, extra2) {
		var type = typeof extra1 == "string" ? extra1:extra2, num = typeof extra1 == "number" ? extra1:extra2;
		if (num != undefined) element = element[num];
		newtag = newtag.split("");
		if (type != undefined) {
			if (newtag[0] == "#") element.id = type[1];
			else if (newtag[0] == ".") element.class = type;
			else eval(`element.${newtag.join("")} = "${type}"`);
		} else {
			if (newtag[0] == "#") return element.id;
			else if (newtag[0] == ".") return element.class = type[1];
			else return eval(`element.${newtag.join("")}`);
		}
	}

	return {
		select: select,
		create: create,
		listen: listen,
		css: new css(),
		text: txt,
		html: htm,
		htm: htm,
		tag: tag,
		txt: txt,
		set: set,
		i: i
	}
}

function $(q){return cpQuery(q);}
