const CACHE_NAME = 'history-test-v2'; // Verze cache

// Seznam souborů, které se mají uložit pro offline použití
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Instalace a uložení do cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivace a vyčištění staré cache
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Získávání dat
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});