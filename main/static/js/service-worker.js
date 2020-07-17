const cname = "v4";
const files = [
  "/manifest.json",
  "/"
];
// Cache on install
self.addEventListener("install", function(e) {
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

// Serve from cache, cache if not already
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cname).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});