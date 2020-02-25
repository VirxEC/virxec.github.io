var errors = "", errhandler = a => errors += `<div class="error">${a.error}</div>`;
if (localStorage.getItem("console") == "On") addEventListener("error", errhandler); // whole point of this is so if anything in the Library breaks, this doesn't break.

var path = location.pathname.split("/")
if (path[path.length-1] == "index.html") {
    path[path.length-1] = "";
    location.replace(path.join("/"));
}
delete path;
if (location.origin == "https://www.virxcase.ga" && location.pathname.split(".")[1] == "html") location.replace(location.pathname.split(".")[0]);

var gamer = $("@isGamer"),
    syntax = $("@isSyntax"),
    widget = $("@isWidget"),
    channel = $("@channel"),
    interval = $("@interval"),
    cconsole = $("@isConsole"), discord;

(async ()=>{
    let desc = $("^/Assets/Html/description.html").file;
    desc.request(function(){
        $(document.head).htm(this.responseText, true);
    });
})();

(async () => {
    let addElement = e => $(document.head).htm(e, true);
    if (widget.i() == "On") addElement(`<link rel="preload" href="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" as="script">`);
})();

if (!widget.i()) widget.i("On");
if (!syntax.i()) syntax.i("On");
if (!channel.i()) channel.i("629774177733181440");
if (!interval.i()) interval.i("400");
if (!cconsole.i()) cconsole.i("Off");
if (!gamer.i()) gamer.i("Off");

$(window).onload(async () => {
    let nav = $("^/Assets/Html/navigation.html").file;
    nav.request(function() {
        $("#nav").htm(this.responseText);
    });

    if (cconsole.i() == "On") {
        (async () => {
            removeEventListener("error", errhandler);
            $("#sconsole").htm("<span id='oconsole'></span><br><textarea id='iconsole'></textarea><br><button id='fconsole'>Run</button>");
            let c = $("#oconsole");
            if (errors != "") c.htm(errors, true);
            console.log = (...args) => args.forEach(e => c.htm(`<div class="log">${e}</div>`, true));
            console.info = (...args) => args.forEach(e => c.htm(`<div class="info">${JSON.stringify(e)}</div>`, true));
            console.warn = (...args) => args.forEach(e => c.htm(`<div class="warn">${e}</div>`, true));
            console.error = (...args) => args.forEach(e => c.htm(`<div class="error">${e}</div>`, true));
            $(window).on("error", e => console.error(e.error));
            $("#fconsole").click(() => {
                try {
                    console.info(eval($("#iconsole").val()));
                } catch (e) {
                    console.error(e);
                }
                $("#iconsole").val("");
            });
            delete errors;
            delete errhandler;
        })();
    }

    if (gamer.i() == "On") {
        var getRandomColor = () => "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16)),
            transition = `transition: background-color ${interval.i() / 1000}s ease-in;`;
        setInterval(async () => {
            if (discord) discord.options.color = getRandomColor();
            $(0).css.append(`nav { background-color: ${getRandomColor()}; ${transition} }`);
            $(0).css.append(`body { background-color: ${getRandomColor()}; ${transition} }`);
        }, interval.i());
    }

    if (widget.i() == "On") {
        let dscript = $("head").create("script");
        dscript.tag("src", "https://cdn.jsdelivr.net/npm/@widgetbot/crate@3");
        dscript.tag("onload", async () => {
            discord = new Crate({
                server: '507708985206505482',
                channel: channel.i(),
                shard: "https://e.widgetbot.io",
                defer: true
            });
        });
        dscript.append();
    }
});