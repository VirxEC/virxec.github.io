/* Copyright 2019 Eric Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 */
function cpQuery(query) {
	var element, local = !1, session = !1, ogquery = query;
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
						local = !0;
					} else {
						query = query.toString().split("*");
						if (query.length == 2) {
							query = query[1];
							session = !0;
						} else element = document.getElementsByTagName(query);
					}
				}
			}
		}
	} else if (!query) element = document;
	else element = query;

	function select(type, num) {
		if (num) element = element[num];
		return element.querySelector(type);
	}

	function textNode(node) {
		return element.createTextNode(node);
	}

	function func(f) {
		return eval("element."+f);
	}

	const create = class {
		constructor(type, num) {
			if (num) element = element[num];
			this.newelem = document.createElement(type);
		}

		style(tag, item) {
			this.newelem.style[tag] = item;
		}

		text(item) {
			this.newelem.textContent = item;
		}

		txt(item) {
			this.text(item);
		}

		html(item) {
			this.newelem.innerHTML = item;
		}

		htm(item) {
			this.html(item);
		}

		tag(tag, item) {
			this.newelem[tag] = item;
		}

		append() {
			element.appendChild(this.newelem);
		}
	};

	const css = class {
		constructor() {
			this.sheet = document.styleSheets[ogquery];
		}

		append(item) {
			this.sheet.insertRule(item, this.sheet.cssRules.length);
		}

		remove(item)  {
			this.sheet.deleteRule(item);
		}

		removeAll() {
			for (var i=0; i<this.sheet.cssRules.length; i++) this.sheet.deleteRule(i);
		}

		replaceWithAll() {
			var i = Array.isArray(arguments[0])? arguments[0]:arguments;
			this.removeAll();
			for (var g in i) this.append(i[g]);
		}

		createSheet() {
			element.appendChild(document.createElement("style"));
		}
	};

	function listen(name, code) {
		element.addEventListener(name, code);
	}

	function i(num) {
		try {
			if (local) return localStorage.getItem(query);
			else if (session) return sessionStorage.getItem(query);
			else if (typeof num == "number") return element[num];
			return element;
		} catch(e) {
			console.warn("Skipping "+e.stack);
		}
	}

	function set(item) {
		try {
			if (local) localStorage.setItem(query, item);
			else if (session) sessionStorage.setItem(query, item);
		} catch(e) {
			console.warn("Skipping "+e.stack);
		}
	}

	function txt(item, extra1, extra2) {
		var add = typeof extra1 == "boolean" ? extra1:extra2, num = typeof extra1 == "number" ? extra1:extra2;
		if (num) element = element[num];
		if (add) element.textContent += item;
		else element.textContent = item;
	}

	function htm(item, extra1, extra2) {
		var add = typeof extra1 == "boolean" ? extra1:extra2, num = typeof extra1 == "number" ? extra1:extra2;
		if (num) element = element[num];
		if (add) element.innerHTML += item;
		else element.innerHTML = item;
	}

	function tag(newtag, extra1, extra2) {
		var type = typeof extra1 == "string" ? extra1:extra2, num = typeof extra1 == "number" ? extra1:extra2;
		if (num) element = element[num];
		newtag = newtag.split("");
		if (type) {
			if (newtag[0] == "#") element.id = type;
			else if (newtag[0] == ".") element.class = type;
			else eval(`element.${newtag.join("")} = "${type}"`);
		} else {
			if (newtag[0] == "#") return element.id;
			else if (newtag[0] == ".") return element.class;
			else return eval(`element.${newtag.join("")}`);
		}
	}

	const file = class {
		constructor() {
			this.raw = new XMLHttpRequest();
		}

		load(f) {
			this.raw.onreadystatechange = f;
		}

		open(type, async=!0, user=null, pass=null) {
			this.raw.open(type, ogquery, async, user, pass);
		}

		send(item) {
			this.raw.send(item);
		}

		request(f) {
			this.raw.onreadystatechange = function() {
				if (this.readyState==4&&this.status==200) {
					f();
				}
			};
			this.raw.open("GET", ogquery);
			this.raw.send();
		}

		abort() {
			this.raw.abort();
		}

		i(type, item, value) {
			return !item && !value ? this.raw[type] : !value ? this.raw.getResponseHeader(item) : this.raw.setRequestHeader(item, value);
		}
	};

	return {
		version: {
			name: "CalcPlus Query",
			major: 1,
			minor: 2,
			bugFix: 0
		},
		create: (tag, num)=>new create(tag, num),
		file: new file(),
		select: select,
		listen: listen,
		node: textNode,
		css: new css(),
		func: func,
		text: txt,
		html: htm,
		htm: htm,
		tag: tag,
		txt: txt,
		set: set,
		i: i
	};
}

function $(q){return cpQuery(q);}