const CACHE_NAME = 'history-learn-v4'; // Změna verze!
const ASSETS = ['./index.html', './manifest.json', './icon-learn.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.map(key => key !== CACHE_NAME ? caches.delete(key) : null)))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));