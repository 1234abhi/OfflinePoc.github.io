let CACHE_NAME = "codePwa";

var urlCache = [
  "./manifest.json",
  "./logo192.png",
  "./",
  "./index.html",
  "./static/js/main.4d5113ea.js",
  "./static/css/main.073c9b0a.css",
];

/// install service worker
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlCache);
    })
  );
});

// fetch cache data

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    console.log("offline");
    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      event.waitUntil(
        this.registration.showNotification("modeNet", {
          body: "Offline",
          icon: "http://localhost:3000/logo192.png",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        let fUrl = event.request.clone();
        fetch(fUrl);
      })
    );
  }
});

this.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheNames) {
            //
          })
          .map(function (cacheNames) {
            return caches.delete(cacheNames);
          })
      );
    })
  );
});
