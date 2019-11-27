async function preload(url,type) {
	var load = document.createElement("link");
	load.rel="preload";
	load.href=url;
	load.as=type;
	document.head.appendChild(load);
}
if ("CalcPlus Library Source Code"==document.title||"CPQuery Source Code"==document.title) {
	console.log("J")
	preload(`../assets/${localStorage.getItem("isDark") == "On"?"dark":"light"}.min.css`, "style");
	preload("../assets/highlight.min.js", "script");
}
preload((document.title == "CalcPlus"?"":"../")+`assets/${localStorage.getItem("isDark") == "On"?"dark":"light"}page.css`, "style");
preload("https://cdn.jsdelivr.net/npm/@widgetbot/crate@3", "script")
