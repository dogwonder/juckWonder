const staticCacheName = 'dgCache';
const version = '1.0.5';

self.oninstall = evt => {
    evt.waitUntil(
        caches.open(staticCacheName + '-' + version)
        .then((cache) => {
            return cache.addAll([
                '/css/main.css', 
                '/css/main.css', 
                '/scripts/app.js',
                '/index.html', 
                '/offline.html'
            ]);
        }).then(self.skipWaiting())
    );
};

self.onactivate = evt => {
    evt.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                const deleteOldCaches = cacheNames.map((cacheName) => {

                    //Old caches - please remove. 
                    if(cacheName !== staticCacheName + '-' + version) {
                        return caches.delete(cacheName);
                    }

                    //this is the current cache
                    return Promise.resolve();
                });
                return Promise.all(deleteOldCaches);
            }).then(() => self.clients.claim())
    );
};

self.onfetch = evt => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        evt.respondWith(
            caches.match(evt.request)
                .then((cachedResponse) => {

                    if(cachedResponse) {
                        return cachedResponse;
                    }
                    
                    return caches.open(staticCacheName + '-' + version).then(cache => {
                        return fetch(evt.request).then(response => {
                            // Put a copy of the response in the runtime cache.
                            return cache.put(evt.request, response.clone()).then(() => {
                                console.log("match found for ", evt.request.url);
                                return response;
                            });
                        });
                    });
            })
        );
    }
};



      

