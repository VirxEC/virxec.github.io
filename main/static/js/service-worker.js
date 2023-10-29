const cname = "v9";
// Cache on install
self.addEventListener("install", function(e) {
  this.skipWaiting();
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
  let update = true

  event.respondWith(
    caches.open(cname).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        if (response)
          return response
        
        update = false
        return fetch(event.request).then(function(response2) {
          if (!event.request.url.includes("google") && [".js", ".css", ".png", ".svg"].some(ss => event.request.url.includes(ss)))
            cache.put(event.request, response2.clone());
          return response2;
        });
      });
    })
  );
  
  if (update && !event.request.url.includes("google") && [".js", ".css", ".png", ".svg"].some(ss => event.request.url.includes(ss)))
    event.waitUntil(caches.open(cname).then(cache => fetch(event.request).then(response => cache.put(event.request, response.clone()).then(response))));
});