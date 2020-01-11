if (location.protocol != 'https:') location.href = 'https:' + location.href.substring(location.protocol.length);
if (localStorage.getItem("isConsole") == "On") window.addEventListener("error", (a, b, c, d, e) => errors += `<div class="error">${e}</div>`);
var errors = "",
  discord, rt = ["/", "/index.html", "/404.html"].includes(location.pathname) ? "" : "/",
  keywords = JSON.parse('["HTML","CSS","JavaScript","InfiniCalc","BigCalc","Big","Infitite","Calculator","Large","Number","Not","Small","Numbers","CalcPlus","Calc","Plus","Big Number Calculator","Big # Calc","GitHub","#","Calculator Plus","Library","JS","Hyper Text Markup Language","Cascading Style Sheet","JS Library"]')
  isOffline = $("*isOffline"),
  syntax = $("@isSyntax"),
  alerted = $("*alerted"),
  isConsole = $("@isConsole"),
  gamer = $("@isGamer"),
  storage = [isOffline, alerted, isConsole, gamer];
  widget = $("@isWidget"),
  intervalx = $("@interval"),
  channel = $("@channel");
async function preload() {
  let manifest = $("head").create("link"),
    theme = $("head").create("meta"),
    word = $("head").create("meta"),
    auth = $("head").create("meta"),
    port = $("head").create("meta"),
    icon = $("head").create("link"),
    apple = { capable: $("head").create("meta"), status: $("head").create("meta"), title: $("head").create("meta"), icon: $("head").create("link") },
    isDark = $("@isDark"),
    mcss = $("head").create("link");
  if (!isDark.i()) isDark.i("On");
  manifest.tag("rel", "manifest");
  manifest.tag("href", "/manifest.json");
  manifest.append();
  mcss.tag("rel", "stylesheet");
  mcss.tag("href", `/assets/${$("@isDark").i() == "Off"?"light":"dark"}.css`);
  mcss.append();
  theme.tag("name", "theme-color");
  theme.tag("content", $("@isDark").i() == "Off" ? "#FFF" : "#000");
  word.tag("name", "keywords");
  word.tag("content", keywords.join());
  auth.tag("name", "author");
  auth.tag("content", "Eric (Virx/VirxEC) Michael Veilleux, virx@virxcase.ga");
  port.tag("name", "viewport");
  port.tag("content", "width=device-width,initial-scale=1.0");
  icon.tag("rel", "icon");
  icon.tag("href", "/assets/icons/512x512.png");
  function path(items) {
    return items.includes(location.pathname);
  }
  if (path(["/LibrarySource/", "/LibrarySource/index.html", "/CPQuerySource/", "/CPQuerySource/index.html"])) {
    var link = $("head").create("link"),
      highlight = $("head").create("link");
    link.tag("rel", "stylesheet");
    link.tag("href", `/assets/3rdParty/${$("@isDark").i() == "Off"?"light":"dark"}.min.css`);
    link.append();
    highlight.tag("rel", "preload");
    highlight.tag("href", "/assets/3rdParty/highlight.min.js");
    highlight.tag("as", "script");
    highlight.append();
  }
  theme.append();
  word.append();
  auth.append();
  port.append();
  icon.append();
  var crate = $("head").create("link");
  crate.tag("rel", "preload");
  crate.tag("href", "/assets/3rdParty/crate3.min.js");
  crate.tag("as", "script");
  crate.append();
  if (path(["/", "/index.html", "/PreviewLibrary/", "/PreviewLibrary/index.html"])) {
    var library = $("head").create("link");
    library.tag("rel", "preload");
    library.tag("href", "/assets/Library.js");
    library.tag("as", "script");
    library.append();
  }
  apple.capable.tag("name", "apple-mobile-web-app-capable");
  apple.capable.tag("content", "yes");
  apple.status.tag("name", "apple-mobile-web-app-status-bar-style");
  apple.status.tag("content", "black");
  apple.title.tag("name", "apple-mobile-web-app-title");
  apple.title.tag("content", "VirxEC Showcase");
  apple.icon.tag("rel", "apple-touch-icon");
  apple.icon.tag("href", "/assets/icons/152x152.png");
  apple.capable.append();
  apple.status.append();
  apple.title.append();
  apple.icon.append();
}
preload();
if (!widget.i()) widget.i("On");
if (!syntax.i()) syntax.i("On");
storage.forEach(e => {
  if (!e.i()) e.i("Off");
});
if (!channel.i()) channel.i("629774177733181440");
if (!intervalx.i()) intervalx.i("400");
$("window").listen("load", async function() {
  async function resizeNav() {
    let m = 0,
      e = document.querySelectorAll('.nava');
    [].reduce.call(e, (p, i) => {
      m = Math.max(i.clientHeight, m);
      return h => p(i.style.height = h);
    }, () => {})(m + 'px');
  }
  $("window").listen("resize", resizeNav);
  resizeNav();
  if (isConsole.i() == "On") {
    $("#sconsole").htm("<span id='oconsole'></span><br><textarea id='iconsole'></textarea><br><button id='fconsole'>Run</button>");
    let c = $("#oconsole");
    if (errors) c.htm(errors, true);
    console.log = (...args) => args.forEach(e => c.htm(`<div class="log">${e}</div>`, true));
    console.info = (...args) => args.forEach(e => c.htm(`<div class="info">${e}</div>`, true));
    console.warn = (...args) => args.forEach(e => c.htm(`<div class="warn">${e}</div>`, true));
    console.error = (...args) => args.forEach(e => c.htm(`<div class="error">${e}</div>`, true));
    $("window").listen("error", (e, s, l, c, o) => console.error(o.stack));
    $("#fconsole").listen("click", e => {
      console.log(eval($("#iconsole").tag("value")));
      $("#iconsole").tag("value", "");
    });
  }
  let dwidget = widget.i(),
    game = gamer.i(),
    interval;
  async function t() {
    if (widget.i() == "On") discord = new Crate({
      server: '507708985206505482',
      channel: channel.i(),
      shard: "https://disweb.dashflo.net"
    });
    interval = setInterval(() => {
      if (game == "On") {
        let color = "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
        if (dwidget == "On") discord.options.color = color;
        $(0).css.append(`nav a { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
        $(0).css.append(`nav a:link, nav a:visited { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
        $(0).css.append(`nav a:hover, nav a:active { background-color: ${color}; transition: background-color ${intervalx.i()/1000}s ease-in; }`);
        $(0).css.append(`body { color: ${color}; transition: color ${intervalx.i()/1000} ease-in; }`);
        $(0).css.append(`button { color: ${color}; transition: color ${intervalx.i()/1000} ease-in; }`);
      }
    }, intervalx.i());
  };
  t();
  if (["/LibrarySource/index.html", "/LibrarySource/", "/CPQuerySource/", "/CPQuerySource/index.html"].includes(location.pathname) && syntax.i() == "On") hljs.initHighlighting();
  if (["/", "/index.html"].includes(location.pathname)) {
    let v = $().version,
      cv = calcplus_info();
    $("#major").txt(v.major);
    $("#minor").txt(v.minor);
    $("#bugFix").txt(v.bugFix);
    $("#cmajor").txt(cv.major);
    $("#cminor").txt(cv.minor);
    $("#cbugFix").txt(cv.bugFix);
  }
});