let c = "v1",
  d = [
    // "https://calcplus.virxcase.dev/calcplus.js",
    // "https://calcplus.virxcase.dev/package.json",
    // "https://calcplus.virxcase.dev/src/calcplus.ts",
    // "https://calcplus.virxcase.dev/calcplus.d.ts",
    "https://virxeb.virxcase.dev/VirxEB.py",
    "https://virxeb.virxcase.dev/util/routines.py",
    "https://virxeb.virxcase.dev/util/objects.py",
    "https://virxeb.virxcase.dev/util/prediction.py",
    "/static/icons/site_icon_hd.png",
    "/static/icons/site_icon.png",
    "/static/icons/youtube.png",
    "/static/icons/gmail.png",
    "/static/icons/github.png",
    "/static/icons/stackoverflow.png",
    "/static/icons/072.png",
    "/static/icons/096.png",
    "/static/icons/128.png",
    "/static/icons/144.png",
    "/static/icons/152.png",
    "/static/icons/192.png",
    "/static/icons/384.png",
    "/static/icons/512.png",
    "/static/js/CPquery.js",
    "/static/js/Prism.js",
    "/static/css/prism.min.css",
    "/static/css/index.css",
    "/static/css/main.css",
    "/CP-P",
    "/CP-S",
    "/VEB",
    "/Options",
    "/manifest.json",
    "/"
  ];
self.addEventListener("install", e => e.waitUntil(caches.open(c).then(f => f.addAll(d)).then(() => self.skipWaiting())));
self.addEventListener("activate", g => g.waitUntil(caches.keys().then(c => Promise.all(c.map(i => i != c ? caches.delete(i) : null)))));
self.addEventListener("fetch", j => j.request.mode != 'navigate' ? 0 : j.respondWith(fetch(j.request).catch(() => caches.match(j.request))));