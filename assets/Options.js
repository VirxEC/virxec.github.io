var errors = "", errhandler = a => errors += `<div class="error">${a.error.stack}</div>`;
if (localStorage.getItem("isConsole") == "On") addEventListener("error", errhandler); // whole point of this is so if anything in the Library breaks, this doesn't break.
var discord, rt = ["/", "/index.html", "/404.html"].includes(location.pathname) ? "" : "/",
  keywords = JSON.parse('["HTML","CSS","JavaScript","InfiniCalc","BigCalc","Big","Infitite","Calculator","Large","Number","Not","Small","Numbers","CalcPlus","Calc","Plus","Big Number Calculator","Big # Calc","GitHub","#","Calculator Plus","Library","JS","Hyper Text Markup Language","Cascading Style Sheet","JS Library"]')
isOffline = $("*isOffline"),
  syntax = $("@isSyntax"),
  alerted = $("*alerted"),
  isConsole = $("@isConsole"),
  gamer = $("@isGamer"),
  storage = [isOffline, alerted, isConsole, gamer];
widget = $("@isWidget"),
  interval = $("@interval"),
  channel = $("@channel");
(async () => {
  function preload(href, type) {
    let item = $("head").create("link");
    item.tag("rel", "preload");
    item.tag("href", href);
    item.tag("as", type);
    item.append();
  }
  let manifest = $("head").create("link"),
    theme = $("head").create("meta"),
    word = $("head").create("meta"),
    auth = $("head").create("meta"),
    port = $("head").create("meta"),
    icon = $("head").create("link"),
    apple = {
      capable: $("head").create("meta"),
      status: $("head").create("meta"),
      title: $("head").create("meta"),
      icon: $("head").create("link")
    },
    isDark = $("@isDark"),
    mcss = $("head").create("link");
  if (!isDark.i()) isDark.i("On");
  manifest.tag("rel", "manifest");
  manifest.tag("href", "/manifest.json");
  manifest.append();
  mcss.tag("rel", "stylesheet");
  mcss.tag("href", `/assets/${$("@isDark").i() == "Off" ? "light" : "dark"}.css`);
  mcss.append();
  theme.tag("name", "theme-color");
  theme.tag("content", $("@isDark").i() == "Off" ? "#FFF" : "#000");
  word.tag("name", "keywords");
  word.tag("content", keywords.join());
  auth.tag("name", "author");
  auth.tag("content", "Eric (Virx/VirxEC) Michael Veilleux (virx@virxcase.ga)");
  port.tag("name", "viewport");
  port.tag("content", "width=device-width,initial-scale=1.0");
  icon.tag("rel", "icon");
  icon.tag("href", "/assets/icons/512.png");
  theme.append();
  word.append();
  auth.append();
  port.append();
  icon.append();
  if (["/LibrarySource/", "/LibrarySource/index.html", "/CPQuerySource/", "/CPQuerySource/index.html"].includes(location.pathname)) {
    let link = $("head").create("link");
    link.tag("rel", "stylesheet");
    link.tag("href", `/assets/3rdParty/${$("@isDark").i() == "Off" ? "light" : "dark"}.min.css`);
    link.append();
    preload("/assets/3rdParty/highlight.min.js", "script");
  }
  if (widget.i() != "Off") preload("/assets/3rdParty/crate3.min.js", "script");
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
})();
if (!widget.i()) widget.i("On");
if (!syntax.i()) syntax.i("On");
if (!channel.i()) channel.i("629774177733181440");
if (!interval.i()) interval.i("400");
storage.forEach(e => !e.i() ? e.i("Off") : 0);
$("window").listen("load", async () => {
  if (widget.i() == "On") {
    (async () => {
      let dscript = $("head").create("script");
      dscript.tag("src", "/assets/3rdParty/crate3.min.js");
      dscript.tag("onload", async () => {
        discord = new Crate({
          server: '507708985206505482',
          channel: channel.i(),
          shard: "https://disweb.dashflo.net"
        });
      });
      dscript.append();
    })();
  }
  async function resizeNav() {
    let m = 0,
      e = document.querySelectorAll('.nava');
    [].reduce.call(e, (p, i) => {
      m = Math.max(i.clientHeight, m);
      return h => p(i.style.height = h);
    }, () => { })(m + 'px');
  }
  $("window").listen("resize", resizeNav);
  resizeNav();
  if (isConsole.i() == "On") {
    (async () => {
      removeEventListener("error", errhandler);
      $("#sconsole").htm("<span id='oconsole'></span><br><textarea id='iconsole'></textarea><br><button id='fconsole'>Run</button>");
      let c = $("#oconsole");
      if (errors != "") c.htm(errors, true);
      console.log = (...args) => args.forEach(e => c.htm(`<div class="log">${e}</div>`, true));
      console.info = (...args) => args.forEach(e => c.htm(`<div class="info">${JSON.stringify(e)}</div>`, true));
      console.warn = (...args) => args.forEach(e => c.htm(`<div class="warn">${e}</div>`, true));
      console.error = (...args) => args.forEach(e => c.htm(`<div class="error">${e}</div>`, true));
      $("window").listen("error", e => console.error(e.error.stack));
      $("#fconsole").listen("click", () => {
        try {
          console.info(eval($("#iconsole").tag("value")));
        } catch (e) {
          console.error(e);
        }
        $("#iconsole").tag("value", "");
      });
    })();
  }
  if (gamer.i() == "On") {
    setInterval(async () => {
      let color = "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
      if (discord != null) discord.options.color = color;
      $(0).css.append(`nav a { background-color: ${color}; transition: background-color ${interval.i() / 1000}s ease-in; }`);
      $(0).css.append(`nav a:link, nav a:visited { background-color: ${color}; transition: background-color ${interval.i() / 1000}s ease-in; }`);
      $(0).css.append(`nav a:hover, nav a:active { background-color: ${color}; transition: background-color ${interval.i() / 1000}s ease-in; }`);
      $(0).css.append(`body { color: ${color}; transition: color ${interval.i() / 1000} ease-in; }`);
      $(0).css.append(`button { color: ${color}; transition: color ${interval.i() / 1000} ease-in; }`);
    }, interval.i());
  }
  (async () => {
    if (["/LibrarySource/index.html", "/LibrarySource/", "/CPQuerySource/", "/CPQuerySource/index.html"].includes(location.pathname) && syntax.i() == "On") hljs.initHighlighting();
  })();
});