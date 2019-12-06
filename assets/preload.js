async function preload(url,type) {
	var load = document.createElement("link");
	load.rel="preload";
	load.href=url;
	load.as=type;
	document.head.appendChild(load);
}
if ("CalcPlus Library Source Code"==document.title||"CPQuery Source Code"==document.title) {
	preload(`../assets/3rdParty/${localStorage.getItem("isDark") == "On"?"dark":"light"}.min.css`, "style");
	preload("../assets/3rdParty/highlight.min.js", "script");
}
const rt = (document.title == "CalcPlus"?"":"../");
preload(rt+`assets/${localStorage.getItem("isDark") == "On"?"dark":"light"}.css`, "style");
preload(rt+"assets/3rdParty/crate3.min.js", "script");
