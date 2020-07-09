const cname = "v3";
const files = [
  "https://calcplus.virxcase.dev/calcplus.js",
  "https://calcplus.virxcase.dev/package.json",
  "https://calcplus.virxcase.dev/src/calcplus.ts",
  "https://calcplus.virxcase.dev/calcplus.d.ts",
  "https://virxeb.virxcase.dev/VirxEB.py",
  "https://virxeb.virxcase.dev/util/routines.py",
  "https://virxeb.virxcase.dev/util/objects.py",
  "https://virxeb.virxcase.dev/util/prediction.py",
  "https://virxeb.virxcase.dev/gui.py",
  "/offline",
  "/CP-P",
  "/CP-S",
  "/VEB",
  "/Options",
  "/manifest.json",
  "/"
];
// Cache on install
self.addEventListener("install", e => {
  this.skipWaiting();
  e.waitUntil(
    caches.open(cname).then(cache => {
      return cache.addAll(files);
    })
  )
});

// Clear cache on activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(c => {
      return Promise.all(
        c.filter(n => (n !== cname)).map(n => caches.delete(n))
      );
    })
  );
});

// Serve from Cache
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      return r || fetch(e.request);
    })
  )
});