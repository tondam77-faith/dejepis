const CACHE_NAME = 'dejepis-app-v2.1'; // Změna verze pro vynucení aktualizace
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './history.png',   // Vaše ikona
  './favicon.ico'    // Vaše ikona
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Smaže starou verzi cache
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});