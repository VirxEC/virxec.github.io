let c = "v4",
  d = [
    "/Assets/Html/navigation.html",
    "/Assets/icons/072.png",
    "/Assets/icons/096.png",
    "/Assets/icons/128.png",
    "/Assets/icons/144.png",
    "/Assets/icons/152.png",
    "/Assets/icons/192.png",
    "/Assets/icons/384.png",
    "/Assets/icons/512.png",
    "/Assets/Js/cookie.min.js",
    "/Assets/Js/CPquery.js",
    "/Assets/Js/Options.js",
    "/Assets/Js/md5.min.js",
    "/Assets/Js/Prism.js",
    "/Assets/Css/prism.css",
    "/Assets/Css/main.css",
    "/CalcPlus/Library.js",
    "/Pages/CP-P.html",
    "/Pages/CP-S.html",
    "/Pages/CPQ-S.html",
    "/Pages/Options.html",
    "/Pages/index.html",
    "/Pages/CP-P",
    "/Pages/CP-S",
    "/Pages/CPQ-S",
    "/Pages/Options",
    "/Pages/index",
    "/Pages/",
    "/manifest.json",
    "/login.html",
    "/logon.html",
    "/index.html",
    "/404.html",
    "/LICENSE",
    "/login",
    "/logon",
    "/index",
    "/404",
    "/"
  ];
self["addEventListener"]("install", e => e["waitUntil"](caches["open"](c)["then"](f => f["addAll"](d))["then"](() => self["skipWaiting"]())));
self["addEventListener"]("activate", g => g["waitUntil"](caches["keys"]()["then"](c => Promise["all"](c["map"](i => i != c ? caches["delete"](i) : null)))));
self["addEventListener"]("fetch", j => {
  j.request.mode != 'navigate' ? 0 : j["respondWith"](fetch(j["request"])["catch"](() => caches["match"](j["request"])));
});