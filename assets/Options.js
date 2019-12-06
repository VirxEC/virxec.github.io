const keywords = ["HTML","CSS","JavaScript","InfiniCalc","BigCalc","Big","Infitite","Calculator","Large","Number","Not","Small","Numbers","CalcPlus","Calc","Plus","Big Number Calculator","Big # Calc","GitHub","#","Calculator Plus","Library","JS","Hyper Text Markup Language","Cascading Style Sheet","JS Library","Python","Python Library"], author = ["Virx","VirxEC"], intervalx = $("@interval"), char = $("head").create("meta"), word = $("head").create("meta"), auth = $("head").create("meta"), port = $("head").create("meta"), icon = $("head").create("link"),isDark = $("@isDark"), mcss = $("head").create("link"), isOffline = $("*isOffline"), alerted = $("*alerted"), isConsole = $("@isConsole"), gamer = $("@isGamer"), widget = $("@isWidget"), channel=$("@channel"), shard=$("@shard"), storage = [isDark,isOffline,alerted,isConsole,gamer], root = document.title == "CalcPlus" ? "assets/":"../assets/";
var discord;
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
mcss.tag("href", `../assets/${$("@isDark").i() == "On"?"dark":"light"}.css`);
char.asyncAppend();
word.asyncAppend();
auth.asyncAppend();
port.asyncAppend();
icon.asyncAppend();
mcss.asyncAppend();
if (["CalcPlus Library Source Code","CPQuery Source Code"].indexOf(document.title)>-1) {
	var link = $("head").create("link");
	link.tag("rel", "stylesheet");
	link.tag("href", `../assets/3rdParty/${$("@isDark").i() == "On"?"dark":"light"}.min.css`);
	link.asyncAppend();
}
if(widget.i() != "On" && widget.i() != "Off") widget.val("On");
storage.forEach(e=>{if(e.i() != "On" && e.i() != "Off") e.val("Off");});
try {
	navigator.serviceWorker.getRegistration().then(registration => {if(!registration) isOffline.val("Off");});
	if (isOffline.i() == "Off") if ('serviceWorker' in navigator) navigator.serviceWorker.register($("*index").i() == "On" ? "sw.min.js":"../sw.min.js").then(() => isOffline.val("On"));
} catch(e) { console.warn("Skipping "+e.stack);}
if (!channel.i()) channel.val("629774177733181440");
if (!intervalx.i()) intervalx.val("200");
onload = ()=>{
	if (isConsole.i() == "On") {
		const console = $("#sconsole");
		console.log = (...args) => args.forEach(e=>console.htm(`<div>${e}</div>`, true));
		console.info = (...args) => args.forEach(e=>console.htm(`<div style="color:blue">${e}</div>`, true));
		console.warn = (...args) => args.forEach(e=>console.htm(`<div style="color:orange">${e}</div>`, true));
		console.error = (...args) => args.forEach(e=>console.htm(`<div style="color:red">${e}</div>`, true));
		onerror=(e,s,l,c,o)=>console.error(o.stack);
	}
	var dwidget = widget.i(), game = gamer.i(), interval;
	if (widget.i() == "On") discord = new Crate({server:'507708985206505482',channel:channel.i(),shard:"https://disweb.dashflo.net",defer:true});
	interval = setInterval(()=>{
		if (game=="On") {
			let color = "#000000".replace(/0/g, ()=>(~~(Math.random()*16)).toString(16));
			if (dwidget=="On") discord.options.color=color;
			$(0).css.append(`nav a { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
			$(0).css.append(`nav a:link, nav a:visited { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
			$(0).css.append(`nav a:hover, nav a:active { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
		}
	}, intervalx.i());
}