const CACHE_NAME = 'jw_cache'
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/scripts/app.js',
  '/images/logotype.svg'
]

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(URLS_TO_CACHE) 
  }))
})

self.addEventListener('fetch', function (ev) {
  if (navigator.onLine) {
    return fetch(ev.request.clone()).then(function (response) {
      if (!response || response.status !== 200) {
        return response
      }

      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(ev.request, response.clone())
      })

      return response
    }).catch(function (err) {
      console.log(err)
    })
  } else {
    ev.respondWith(caches.match(ev.request).then(function (response) {
      if (response) {
        // A cached response has been found!
        return response
      } else {
        // We don't have a cached response, initiate a fetch...
        return fetch(event.request)
      }
    }))
  }
})