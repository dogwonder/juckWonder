cacheName = 'dg-cache';
const filestoCache = [
    '/index.html',
    '/css/styles.css',
    '/scripts/app.js',
    '/images/logotype.svg'
]; 
self.addEventListener('install', e => {
    e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
    );
});