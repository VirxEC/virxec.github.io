var errors = "", discord;
if (localStorage.getItem("isConsole") == "On") window.onerror=(a,b,c,d,e)=>errors += `<div class="error">${e}</div>`;
const rt = ["/", "/index.html", "/404.html"].includes(location.pathname)?"":"../", keywords = JSON.parse('["HTML","CSS","JavaScript","InfiniCalc","BigCalc","Big","Infitite","Calculator","Large","Number","Not","Small","Numbers","CalcPlus","Calc","Plus","Big Number Calculator","Big # Calc","GitHub","#","Calculator Plus","Library","JS","Hyper Text Markup Language","Cascading Style Sheet","JS Library"]'), intervalx = $("@interval"), theme=$("head").create("meta"), char = $("head").create("meta"), word = $("head").create("meta"), auth = $("head").create("meta"), port = $("head").create("meta"), icon = $("head").create("link"),isDark = $("@isDark"), mcss = $("head").create("link"), isOffline = $("*isOffline"), syntax = $("@isSyntax"), alerted = $("*alerted"), isConsole = $("@isConsole"), gamer = $("@isGamer"), widget = $("@isWidget"), channel=$("@channel"), storage = [isOffline,alerted,isConsole,gamer];
if (!isDark.i()) isDark.i("On");
theme.tag("name","theme-color");
theme.tag("content",$("@isDark").i()=="Off"?"rbg(255,255,255)":"rbg(0,0,0)");
char.tag("charset","UTF-8");
word.tag("name","keywords");
word.tag("content",keywords.join());
auth.tag("name","author");
auth.tag("content","Eric (Virx/VirxEC) Michael Veilleux, virx@virxcase.ga");
port.tag("name","viewport");
port.tag("content","width=device-width,initial-scale=1.0");
icon.tag("rel","icon");
icon.tag("href", rt+"assets/logo.png");
mcss.tag("rel", "stylesheet");
mcss.tag("href", rt+`assets/${$("@isDark").i() == "Off"?"light":"dark"}.css`);
if (["/LibrarySource/index.html","/LibrarySource/","/CPQuerySource/","/CPQuerySource/index.html"].includes(location.pathname)) {
	const link = $("head").create("link");
	link.tag("rel", "stylesheet");
	link.tag("href", `/assets/3rdParty/${$("@isDark").i() == "Off"?"light":"dark"}.min.css`);
	link.append();
}
theme.append();
word.append();
auth.append();
port.append();
char.append();
icon.append();
mcss.append();
if (!widget.i()) widget.i("On");
if (!syntax.i()) syntax.i("On");
storage.forEach(e=>{if(!e.i()) e.i("Off");});
try {
	navigator.serviceWorker.getRegistration().then(r => {if(!r) isOffline.i("Off");});
	if (isOffline.i() == "Off" && 'serviceWorker' in navigator) navigator.serviceWorker.register($("*index").i() == "On" ? "sw.min.js":"/sw.min.js").then(() => isOffline.i("On"));
} catch(e) { console.warn("Skipping "+e.stack);}
if (!channel.i()) channel.i("629774177733181440");
if (!intervalx.i()) intervalx.i("400");
$("window").listen("load", ()=>{
  function resizeNav() {
    let m=0,e=document.querySelectorAll('.nava');
    [].reduce.call(e,(p,i)=>{
      m=Math.max(i.clientHeight,m);
      return h=>p(i.style.height=h);
    }, ()=>{})(m+'px');
  }
  $("window").listen("resize", resizeNav);
  resizeNav();
	if (isConsole.i() == "On") {
		$("#sconsole").htm("<span id='oconsole'></span><br><textarea id='iconsole'></textarea><br><button id='fconsole'>Run</button>");
		const c = $("#oconsole");
    if (errors) c.htm(errors, true);
		console.log = (...args) => args.forEach(e=>c.htm(`<div class="log">${e}</div>`, true));
		console.info = (...args) => args.forEach(e=>c.htm(`<div class="info">${e}</div>`, true));
		console.warn = (...args) => args.forEach(e=>c.htm(`<div class="warn">${e}</div>`, true));
		console.error = (...args) => args.forEach(e=>c.htm(`<div class="error">${e}</div>`, true));
		$("window").listen("error", (e,s,l,c,o)=>console.error(o.stack));
		$("#fconsole").listen("click", e=>{
			console.log(eval($("#iconsole").tag("value")));
			$("#iconsole").tag("value","");
		});
	}
	var dwidget = widget.i(), game = gamer.i(), interval;
	if (widget.i() == "On") discord = new Crate({server:'507708985206505482', channel:channel.i(), shard:"https://disweb.dashflo.net", defer:true});
	interval = setInterval(()=>{
		if (game=="On") {
			let color = "#000000".replace(/0/g, ()=>(~~(Math.random()*16)).toString(16));
			if (dwidget=="On") discord.options.color=color;
			$(0).css.append(`nav a { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
			$(0).css.append(`nav a:link, nav a:visited { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
			$(0).css.append(`nav a:hover, nav a:active { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
      $(0).css.append(`body { color: ${color}; transition: color ${intervalx.i()/1000} ease-in; }`);
      $(0).css.append(`button { color: ${color}; transition: color ${intervalx.i()/1000} ease-in; }`);
		}
	}, intervalx.i());
  if (["/LibrarySource/index.html","/LibrarySource/","/CPQuerySource/","/CPQuerySource/index.html"].includes(location.pathname) && syntax.i() == "On") hljs.initHighlighting();
  if (["/", "/index.html"].includes(location.pathname)) {
    const v = $().version, cv = calcplus_info();
    $("#major").txt(v.major);
    $("#minor").txt(v.minor);
    $("#bugFix").txt(v.bugFix);
    $("#cmajor").txt(cv.major);
    $("#cminor").txt(cv.minor);
    $("#cbugFix").txt(cv.bugFix);
  }
});