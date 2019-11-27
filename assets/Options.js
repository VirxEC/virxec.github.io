const keywords = ["HTML","CSS","JavaScript","InfiniCalc","BigCalc","Big","Infitite","Calculator","Large","Number","Not","Small","Numbers","CalcPlus","Calc","Plus","Big Number Calculator","Big # Calc","GitHub","#","Calculator Plus","Library","JS","Hyper Text Markup Language","Cascading Style Sheet","JS Library","Python","Python Library"], author = ["Virx","VirxEC"], char = $("head").create("meta"), word = $("head").create("meta"), auth = $("head").create("meta"), port = $("head").create("meta"), icon = $("head").create("link"),isDark = $("@isDark"), mcss = $("head").create("link"), isOffline = $("*isOffline"), alerted = $("*alerted"), isConsole = $("@isConsole"), gamer = $("@isGamer"), widget = $("@isWidget"), storage = [isDark,isOffline,alerted,isConsole,gamer], root = document.title == "CalcPlus" ? "assets/":"../assets/";
char.tag("charset","UTF-8");
word.tag("name","keywords");
word.tag("content",keywords.join());
auth.tag("name","author");
auth.tag("content",author.join());
port.tag("name","viewport");
port.tag("content","width=device-width,initial-scale=1.0");
icon.tag("rel","icon");
icon.tag("href",(document.title=="CalcPlus"?"":"../")+"assets/logo.png");
mcss.tag("rel", "stylesheet");
mcss.tag("href", `../assets/${$("@isDark").i() == "On"?"dark":"light"}page.css`);
char.asyncAppend();
word.asyncAppend();
auth.asyncAppend();
port.asyncAppend();
icon.asyncAppend();
mcss.asyncAppend();
if (["CalcPlus Library Source Code","CPQuery Source Code"].indexOf(document.title)>-1) {
	var link = $("head").create("link");
	link.tag("rel", "stylesheet");
	link.tag("href", `../assets/${$("@isDark").i() == "On"?"dark":"light"}.min.css`);
	link.asyncAppend();
}
if(widget.i() != "On" && widget.i() != "Off") widget.set("On");
storage.forEach(e=>{if(e.i() != "On" && e.i() != "Off") e.set("Off");});
try {
	navigator.serviceWorker.getRegistration().then(registration => {if(!registration) isOffline.set("Off");});
	if (isOffline.i() == "Off") if ('serviceWorker' in navigator) navigator.serviceWorker.register($("*index").i() == "On" ? "sw.min.js":"../sw.min.js").then(() => isOffline.set("On"), {"Cache-Control": "max-age=555555"});
} catch(e) { console.warn("Skipping "+e.stack);}
onload = ()=>{
	if (isConsole.i() == "On") {
		var c = $().select(".console");
		console.log = (...args) => args.forEach(m => {
			try { c.asyncAppend($().node("\n "+m)); } catch(e) { console.warn("Skipping "+e.stack); }
		});
		console.warn = (...args) => args.forEach(e => {
			try {
				const s = $().create("span");
				s.txt("\n"+e);
				s.style("color", "rgb(205, 205, 0)");
				c.asyncAppend();
			} catch(e) { console.error("Skipping "+e.stack); }
		});
		console.error = (...args) => args.forEach(e => {
			try {
				const s = $().create("span");
				s.txt("\n"+e);
				s.style("color", "red");
				c.asyncAppend(s);
			} catch(e) { document.write("WARNING: "+e.stack); }
		});
		onerror=(e,s,l,c,o)=>console.error(o.stack);
	}
	if (widget.i() == "On") {
		const discord = new Crate({server:'507708985206505482',channel:($("@channel").i() ? $("@channel").i() : '629774177733181440'),shard:'https://disweb.dashflo.net',defer:true});
		if (gamer.i() == "On") setTimeout(setInterval(()=>{discord.options.color="#000000".replace(/0/g, ()=>(~~(Math.random() * 16)).toString(16))}, 200), 500);
	}
}