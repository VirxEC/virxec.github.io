const rt = ["/", "/index.html", "/404.html"].includes(location.pathname)?"":"../";
async function preload(url,type) {
	var load = document.createElement("link");
	load.rel="preload";
	load.href=rt+url;
	load.as=type;
	document.head.appendChild(load);
}
if (["/LibrarySource/index.html","/LibrarySource/","/CPQuerySource/","/CPQuerySource/index.html"].inculdes(location.pathname)) {
	preload(`assets/3rdParty/${localStorage.getItem("isDark") == "On"?"dark":"light"}.min.css`, "style");
	preload("assets/3rdParty/highlight.min.js", "script");
}
preload(`assets/${localStorage.getItem("isDark") == "Off"?"light":"dark"}.css`, "style");
preload("assets/3rdParty/crate3.min.js", "script");
