function loadOptions(){
    if ($ == undefined) throw new SyntaxError("$ is undefined");
    const isDark = $("@isDark"), isOffline = $("*isOffline"), alerted = $("*alerted"), isConsole = $("@isConsole"), savei = $("@isSaveI"), storage = ["isDark","isOffline","alerted","isConsole","savei"];
    for (var i=0;i<storage.length;i++) eval(`if(!(${storage[i]}.me() == "Off" || ${storage[i]}.me() == "On")) ${storage[i]}.set("Off")`);
    if (isDark.me() == "On") {
        $(0).css.replaceWithAll(
            'body { color: white; background-color: black; margin: 0 !important; }',
            'button { color: white; background-color: rgb(50, 50, 50); border-color: rgb(60, 60, 60); }',
            'a { color: rgb(0, 0, 255); }',
            'span.broken { color: red; }',
            'span.fix { color: yellow; }',
            'span.verify { color: orange; }',
            'span.working { color: green; }',
            '.removeInput { color: black; background-color: red; border: none; }',
            'nav a { background-color: rgb(30, 30, 30); color: white; text-decoration: none; outline: none; padding: 10px 20px; display: block; float: left; border-right: solid 1px rgb(75, 75, 75); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; width: 16.666%; text-align: center; box-sizing: border-box; }',
            'nav a:link, nav a:visited { background-color: rgb(30, 30, 30); color: white; }',
            'nav a:hover, nav a:active { background-color: rgb(60, 60, 60); color: rgb(215, 215, 215); }'
        );
    } else {
        $(0).css.replaceWithAll(
            'body { color: black; background-color: white; margin: 0 !important; }',
            'button { color: black; background-color: rgb(200, 200, 200); border-color: rgb(210, 210, 210); }',
            'a { color: rgb(0, 0, 192); }',
            'span.broken { color: red; }',
            'span.fix { color: rgb(235, 235, 0); }',
            'span.verify { color: orange; }',
            'span.working { color: green; }',
            '.removeInput { color: black; background-color: red; border: none; }',
            'nav a { background-color: grey; color: white; text-decoration: none; outline: none; padding: 10px 20px; display: block; float: left; border-right: solid 1px silver; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; width: 16.666%; text-align: center; box-sizing: border-box; }',
            'nav a:link, nav a:visited { background-color: grey; color: white; }',
            'nav a:hover, nav a:active { background-color: silver; color: black; }'
        );
    }

    try { 
		navigator.serviceWorker.getRegistration().then(registration => {if(!registration) isOffline.set("Off");});
		if (isOffline.me() == "Off") if ('serviceWorker' in navigator) navigator.serviceWorker.register($("*index").me() == "On" ? "sw.min.js":"../sw.min.js").then(() => isOffline.set("On"));
    } catch(e) {console.error(e);}
	if (isConsole.me() == "On") {
        var c = document.querySelector(".console");
        console.log = (...args) => args.forEach(m => {
            try { c.appendChild(document.createTextNode(`\n ${m}`)); } catch(err) {}
        });
        console.warn = (...args) => args.forEach(e => {
            try {
                const s = document.createElement("span");
                    s.textContent = "\n" + e;
                    s.style.color = "rgb(205, 205, 0)";
                    c.appendChild(s);
            } catch(err) {}
        });
        console.error = (...args) => args.forEach(e => {
            try {
                const s = document.createElement("span");
                    s.textContent = "\n" + e;
                    s.style.color = "red";
                    c.appendChild(s);
            } catch(err) {}
        });

        window.onerror=(e,s,l,c)=>console.error(`${e} at: ${s} : ${l}:${c}`);
    }
}
window.addEventListener("load", loadOptions());
