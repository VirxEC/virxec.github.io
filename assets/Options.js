var errors = "", errhandler = a => errors += `<div class="error">${a.error.stack}</div>`;
if (localStorage.getItem("isConsole") == "On") addEventListener("error", errhandler); // whole point of this is so if anything in the Library breaks, this doesn't break.
var isOffline = $("*isOffline"),
    syntax = $("@isSyntax"),
    alerted = $("*alerted"),
    isConsole = $("@isConsole"),
    gamer = $("@isGamer"),
    storage = [isOffline, alerted, isConsole, gamer],
    widget = $("@isWidget"),
    interval = $("@interval"),
    dark = $("@isDark"),
    channel = $("@channel"), discord;

(async ()=>{
    let desc = $("^/assets/description.html").file;
    desc.request(function(){
        $(document.head).htm(this.responseText, true);
	});
})();

(async () => {
    let addElement = e => $(document.head).htm(e, true);
    if (widget.i() == "On") addElement(`<link rel="preload" href="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" as="script">`);
    if (!dark.i()) dark.i("On");
    addElement(`<link rel="stylesheet" href="/assets/${$("@isDark").i() == "Off" ? "light" : "dark"}.css">`);
    addElement(`<meta name="theme-color" content="${$("@isDark").i() == "Off" ? "#FFF" : "#000"}">`);
    if (["/LibrarySource/", "/LibrarySource/index.html", "/CPQuerySource/", "/CPQuerySource/index.html"].includes(location.pathname)) {
        addElement(`<link rel="stylesheet" href="/assets/3rdParty/${$("@isDark").i() == "Off" ? "light" : "dark"}.min.css">`);
        addElement("<link rel='preload' href='/assets/3rdParty/highlight.min.js' as='script'>");
    }
})();

if (!widget.i()) widget.i("On");
if (!syntax.i()) syntax.i("On");
if (!channel.i()) channel.i("629774177733181440");
if (!interval.i()) interval.i("400");
storage.forEach(e => !e.i() ? e.i("Off") : 0);
$("window").listen("load", async () => {
    if (widget.i() == "On") {
        let dscript = $("head").create("script");
        dscript.tag("src", "https://cdn.jsdelivr.net/npm/@widgetbot/crate@3");
        dscript.tag("onload", async () => {
            discord = new Crate({
                server: '507708985206505482',
                channel: channel.i(),
                shard: "https://disweb.dashflo.net"
            });
        });
        dscript.append();
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