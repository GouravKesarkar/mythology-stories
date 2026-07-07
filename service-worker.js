const CACHE_NAME = "itihasa-cache-v4"; // bumped: new asset layout

const CORE_ASSETS = [
  "index.html",
  "language.html",
  "index_story.html",
  "story.html",
  "assets/css/style.css",
  "assets/js/site.js",
  "manifest.json",
  "icon_192.png",
  "icon.png",
];

// Install: pre-cache the shell. Ignore any single failed asset so one bad
// URL can't block the whole install.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        CORE_ASSETS.map((url) => cache.add(url).catch(() => null))
      )
    )
  );
});

// Activate: drop any caches from older versions.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first, falling back to cache when offline.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
