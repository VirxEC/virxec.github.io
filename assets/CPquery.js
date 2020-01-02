/* Copyright 2019 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 */
function cpQuery(query) {
  var element, local = !1, session = !1, ogquery = query;
  if (typeof query == "string") {
    if (["","document"].includes(query)) element = document;
    else if (query == "head") element = document.head;
    else if (query == "body") element = document.body;
    else {
      if (query[0] == "@") query = query.substr(1), local = !0;
      else if (query[0] == "*") query = query.substr(1), session = !0;
      else if (query[0] == '^') query = query.substr(1);
      else if (query[0] == "#") element = document.querySelector(query);
      else element = document.querySelectorAll(query);
    }
  } else if (!query) element = document;
  else element = query;

  function select(num) {
    element = element[num];
  }

  function textNode(node) {
    return element.createTextNode(node);
  }

  function func(f) {
    return element[f];
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

    async asyncAppend() {
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
    if (typeof code == "object") Object.keys(code).forEach(i=>element.addEventListener(i, code[i]));
    else element.addEventListener(name, code);
  }

  function i(num) {
    try {
      if (num) {
        if (typeof num == "number") return element[num];
        else if (local) localStorage.setItem(query, num);
        else if (session) sessionStorage.setItem(query, num);
      } else if (local) return localStorage.getItem(query);
      else if (session) return sessionStorage.getItem(query);
      else return element;
    } catch(e) {
      console.warn("Skipping "+e.stack);
      return e.stack;
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

  function tag(newtag, extra) {
    if (typeof extra == "string") extra = [extra];
    if (extra && extra[1]) element = element[extra[1]];
    newtag = newtag.split("");
    if (extra && extra[0]) {
      if (newtag[0] == "#") element.id = extra[0];
      else if (newtag[0] == ".") element.class = extra[0];
      else element[newtag.join("")] = extra[0];
    } else {
      if (newtag[0] == "#") return element.id;
      else if (newtag[0] == ".") return element.class;
      else return element[newtag.join("")];
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
      this.raw.open(type, query, async, user, pass);
    }

    send(item) {
      this.raw.send(item);
    }

    request(f) {
      this.raw.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          f();
        }
      };
      this.raw.open("GET", query);
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
      bugFix: 1
    },
    create: (tag, num)=>new create(tag, num),
    file: new file(),
    listen: listen,
    node: textNode,
    css: new css(),
    func: func,
    html: htm,
    text: txt,
    htm: htm,
    tag: tag,
    txt: txt,
    i: i,
    on: listen,
    val: f=>tag("value",f),
    click: f=>listen("click",f),
    ready: f=>listen("load",f),
    hide: ()=>tag("style.display", "none"),
    show: ()=>tag("style.display", "block"),
    dblclick: f=>listen("dblclick",f),
    mouseenter: f=>listen("mouseenter",f),
    mouseleave: f=>listen("mouseleave",f),
    mousedown: f=>listen("mousedown",f),
    mouseup: f=>listen("mouseup",f),
    hover: f=>listen("hover",f),
    focus: f=>listen("focus",f)
  };
}

function $(q){return cpQuery(q);}