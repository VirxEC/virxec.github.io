/* Copyright 2019-2020 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 */
function cpQuery(query, num = false) {
    let element, local = false,
        session = false;
    (async ()=>{
        if (typeof query == "string") {
            if (["", "document"].includes(query)) element = document;
            else if (query == "window") element = window;
            else if (query == "head") element = document.head;
            else if (query == "body") element = document.body;
            else {
                if (query[0] == "@") query = query.substr(1), local = true;
                else if (query[0] == "*") query = query.substr(1), session = true;
                else if (query[0] == '^') query = query.substr(1);
                else if (num == false) element = document.querySelector(query);
                else if (num == true) element = document.querySelectorAll(query);
                else element = element = document.querySelectorAll(query)[num];
            }
        } else if (!query) element = document;
        else element = query;
    })();

    function textNode(node) {
        return element.createTextNode(node);
    }
    function func(f) {
        return element[f];
    }
    function tagfunc(f) {
        let a = [...arguments];
        a.shift();
        return element[f](...a);
    }
    const create = class {
        constructor(type, tags) {
            this.newelem = document.createElement(type);
            if (tags) {
                for (let [key, value] of Object.entries(tags)) this.newelem[key] = value;
                element.appendChild(this.newelem);
            }
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

        tags(items) {
            for (let [key, value] of Object.entries(items)) this.newelem[key] = value;
        }

        async append() {
            element.appendChild(this.newelem);
        }
    };
    const css = class {
        constructor() {
            this.sheet = document.styleSheets[query];
        }
        async append(item) {
            this.sheet.insertRule(item, this.sheet.cssRules.length);
        }
        async remove(item) {
            this.sheet.deleteRule(item);
        }
        async removeAll() {
            for (let i = 0; i < this.sheet.cssRules.length; i++) this.sheet.deleteRule(i);
        }
        async replaceWithAll() {
            let i = Array.isArray(arguments[0]) ? arguments[0] : arguments;
            this.removeAll();
            for (let g in i) this.append(i[g]);
        }
        async createSheet() {
            element.appendChild(document.createElement("style"));
        }
    };
    async function listen(name, code, options = false) {
        if (typeof code == "object") Object.keys(code).forEach(i => element.addEventListener(i, code[i], options));
        else element.addEventListener(name, code, options);
    }
    function i(num) {
        try {
            if (num) {
                if (typeof num == "number") return element[num];
                else if (local) localStorage.setItem(query, num);
                else if (session) sessionStorage.setItem(query, num);
            } else if (local) return localStorage.getItem(query);
            else if (session) return sessionStorage.getItem(query);
            return element;
        } catch (e) {
            console.warn("Skipping " + e.stack);
            return e.stack;
        }
    }
    function txt(item, add) {
        return !item ? element.textContent : add ? element.textContent += item : element.textContent = item;
    }
    function htm(item, add) {
        return !item ? element.innerHTML : add ? element.innerHTML += item : element.innerHTML = item;
    }
    function tag(tag, extra) {
        if (typeof extra == "string") extra = [extra];
        if (extra) extra.forEach(item=>tag == "#" ? element.id = item : tag == "." ? element.class = item : element[tag] = item);
        else return tag == "#" ? element.id : tag == "." ? element.class : element[tag];
    }
    function tagcss(tag, extra) {
        if (typeof extra == "string") extra = [extra];
        if (extra) extra.forEach(item=> element.style[tag] = item);
        else return element.style[tag];
    }
    const file = class {
        constructor(options) {
            this.raw = new XMLHttpRequest();
            if (typeof options == "object") {
                if (options.load) this.raw.onreadystatechange = options.load;
                if (options.ready) {
                    this.raw.onreadystatechange = function() {
                        if (this.readyState = XMLHttpRequest.DONE && this.status == 200) options.ready.call(this);
                    };
                }
                if (options.setRequestHeader) this.raw.setRequestHeader(options.setRequestHeader.item, options.setRequestHeader.value);
                else if (options.requestHeader) this.raw.setRequestHeader(options.reqestHeader.item, options.reqestHeader.value);

                if (typeof options.open == "string") options.open = { type:options.open };
                if (!options.open.async) options.open.async = true;
                this.raw.open(options.open.type, options.open.async, options.open.username, options.open.password);
                this.raw.send(options.send);
            } else if (typeof options == "function") {
                this.raw.onreadystatechange = function() {
                    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) options.call(this);
                };
                this.raw.open("GET", query);
                this.raw.send();
            }
        }
        async load(f) {
            this.raw.onreadystatechange = f;
        }
        async ready(f) {
            this.raw.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) f.call(this);
            };
        }
        async open(type, async = true, user = null, pass = null) {
            this.raw.open(type, query, async, user, pass);
        }
        async send(item) {
            this.raw.send(item);
        }
        async request(f) {
            this.raw.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) f.call(this);
            };
            this.raw.open("GET", query);
            this.raw.send();
        }
        async abort() {
            this.raw.abort();
        }
        i(type, item, value) {
            return !item && !value ? this.raw[type] : !value ? this.raw.getResponseHeader(item) : this.raw.setRequestHeader(item, value);
        }
    };
    return {
        version: {
            name: "CPQuery",
            major: 1,
            minor: 3,
            bugFix: 0
        },
        show: () => tagcss("visibility", "visible"),
        hide: () => tagcss("visibility", "hidden"),
        create: (tag, num) => new create(tag, num),
        mouseenter: f => listen("mouseenter", f),
        mouseleave: f => listen("mouseleave", f),
        mousedown: f => listen("mousedown", f),
        dblclick: f => listen("dblclick", f),
        mouseup: f => listen("mouseup", f),
        onload: f => listen("load", f),
        remove: () => tagfunc("remove"),
        click: f => listen("click", f),
        hover: f => listen("hover", f),
        focus: f => listen("focus", f),
        ready: f => listen("load", f),
        file: o => new file(o),
        val: f => tag("value", f),
        node: textNode,
        css: new css(),
        on: listen,
        html: htm,
        text: txt,
        tagfunc,
        listen,
        tagcss,
        func,
        htm,
        tag,
        txt,
        i
    };
}

function $(q) {
    return cpQuery(q);
}