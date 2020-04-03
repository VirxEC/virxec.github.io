var errors = "", errhandler = a => errors += `<div class="error">${a.error}</div>`;
if (localStorage.getItem("console") == "On") addEventListener("error", errhandler); // whole point of this is so if anything in the Library breaks, this doesn't break.

var gamer = $("@isGamer"),
    widget = $("@isWidget"),
    channel = $("@channel"),
    interval = $("@interval"),
    cconsole = $("@isConsole"), discord;

(async ()=>{
    if (!widget.i()) widget.i("On");
    if (!channel.i()) channel.i("629774177733181440");
    if (!interval.i()) interval.i("400");
    if (!cconsole.i()) cconsole.i("Off");
    if (!gamer.i()) gamer.i("Off");
    if (widget.i() == "On") $("head").htm('<link rel="preload" href="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" as="script">', true);
})();

$(window).onload(()=>{
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

    if (gamer.i() == "On") setInterval(async () => discord ? discord.options.color = "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16)) : null, interval.i());

    if (widget.i() == "On") {
        $("head").create("script", {
            src: "https://cdn.jsdelivr.net/npm/@widgetbot/crate@3",
            onload: async ()=>{
                discord = new Crate({
                    server: '507708985206505482',
                    channel: channel.i(),
                    shard: "https://e.widgetbot.io",
                    defer: true
                });
            }
        });
    }
});