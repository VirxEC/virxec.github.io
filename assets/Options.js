const keywords = ["HTML","CSS","JavaScript","InfiniCalc","BigCalc","Big","Infitite","Calculator","Large","Number","Not","Small","Numbers","CalcPlus","Calc","Plus","Big Number Calculator","Big # Calc","GitHub","#","Calculator Plus","Library","JS","Hyper Text Markup Language","Cascading Style Sheet","JS Library","Python","Python Library"], author = ["Virx","VirxEC"];
function loadOptions(){
	if ($ == undefined) throw new SyntaxError("$ is undefined");
	if ($().version.major != 1 || $().version.minor < 2 || $().version.bugFix < 0) throw new TypeError("CPQuery version in incorrect, should be 1.2.0 or slightly later");
	const isDark = $("@isDark"), isOffline = $("*isOffline"), alerted = $("*alerted"), isConsole = $("@isConsole"), savei = $("@isSaveI"), storage = [isDark,isOffline,alerted,isConsole,savei], root = document.title == "CalcPlus" ? "assets/":"../assets/", file = $(root+(isDark.i() == "On" ? "dark" : "light")+"page.css").file;
	for (var i=0;i<storage.length;i++) if(!(storage[i].i() == "Off" || storage[i].i() == "On")) storage[i].set("Off");
	$("head").css.createSheet();
	file.request(function(){$(0).css.replaceWithAll(file.i("responseText").split("\n"))});
	try { 
		navigator.serviceWorker.getRegistration().then(registration => {if(!registration) isOffline.set("Off");});
		if (isOffline.i() == "Off") if ('serviceWorker' in navigator) navigator.serviceWorker.register($("*index").i() == "On" ? "sw.min.js":"../sw.min.js").then(() => isOffline.set("On"));
	} catch(e) { console.warn("Skipping "+e.stack);}
	if (isConsole.i() == "On") {
		var c = $(document).select(".console");
		console.log = (...args) => args.forEach(m => {
			try { c.appendChild($(document).node("\n "+m)); } catch(e) { console.warn("Skipping "+e.stack); }
		});
		console.warn = (...args) => args.forEach(e => {
			try {
				const s = $(document).create("span");
				s.txt("\n"+e);
				s.style("color", "rgb(205, 205, 0)");
				c.append();
			} catch(e) { console.error("Skipping "+e.stack); }
		});
		console.error = (...args) => args.forEach(e => {
			try {
				const s = $(document).create("span");
				s.txt("\n"+e);
				s.style("color", "red");
				c.appendChild(s);
			} catch(e) { document.write("WARNING: "+e.stack); }
		});

		window.onerror=(e,s,l,c,o)=>console.error(o.stack);
	}
}
window.addEventListener("load", ()=>{
	if ($ == undefined) throw new SyntaxError("$ is undefined");
	var v = $().version;
	if (v.major != 1 || v.minor < 2 || v.bugFix < 0) throw new TypeError("CPQuery version in incorrect, should be 1.2.0 or slightly later");
	var char = $("head").create("meta"), word = $("head").create("meta"), auth = $("head").create("meta"), port = $("head").create("meta"), icon = $("head").create("link");
	char.tag("charset","UTF-8");
	word.tag("name","keywords");
	word.tag("content",keywords.join());
	auth.tag("name","author");
	auth.tag("content",author.join());
	port.tag("name","viewport");
	port.tag("content","width=device-width,initial-scale=1.0");
	icon.tag("rel","icon");
	icon.tag("href",(document.title=="CalcPlus"?"":"../")+"assets/logo.png");
	char.append();
	word.append();
	auth.append();
	port.append();
	icon.append();
	if (document.title == "CalcPlus Library Source Code" || document.title == "CPQuery Source Code") {
		var link = $("head").create("link");
		link.tag("rel", "stylesheet");
		link.tag("href", `../assets/${$("@isDark").i() == "On"?"dark":"light"}.min.css`)
		link.append();
	}
	if (document.title != "CalcPlus") new Crate({server:'507708985206505482',channel:'629774177733181440',shard:'https://disweb.dashflo.net'});
	loadOptions();
});