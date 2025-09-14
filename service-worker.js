self.addEventListener("install", event => {
    event.waitUntil(
      caches.open("mythology-cache").then(cache => {
        return cache.addAll([
          "index.html",
          "story.html",
          "styles.css",
          "app.js",
          "manifest.json",
          "stories/stories_en.json",
          "stories/stories_hi.json",
          "stories/stories_mr.json"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  