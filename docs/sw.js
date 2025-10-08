self.addEventListener("install", e => {
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open("v1").then(cache =>
      cache.match(e.request).then(resp => {
        return resp || fetch(e.request).then(response => {
          if (e.request.url.startsWith(self.location.origin)) {
            cache.put(e.request, response.clone());
          }
          return response;
        });
      })
    )
  );
});
