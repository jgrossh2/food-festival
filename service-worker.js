const APP_PREFIX = 'FoodEvent-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
// use relative paths 
// no image files, due to memory space
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];
// self refers to service worker object
self.addEventListener('install', function (e) {
    // makes sure the service worker doesn't move on until installing phase is finished
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
      )
})
self.addEventListener('activate', function (e) {
    e.waitUntil(
        // .keys() returns array of all cache names
        // keyList is parameter that contains all cache names under <>.github.io
      caches.keys().then(function (keyList) {
        let cacheKeeplist = keyList.filter(function (key) {
            // APP_PREFIX saves app prefix 
          return key.indexOf(APP_PREFIX);
        })
        cacheKeeplist.push(CACHE_NAME);

        return Promise.all(keyList.map(function (key, i) {
            // only returns value of -1 if item not found in keylist
            if (cacheKeeplist.indexOf(key) === -1) {
              console.log('deleting cache : ' + keyList[i] );
            //   if key isn't found in keylist, delete from cache list
              return caches.delete(keyList[i]);
            }
          })
          );
      })
    );
});
// retrieve info from the cache
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                // if cache is available, respond with cache
              console.log('responding with cache : ' + e.request.url)
              return request
            } else { 
                // if there are no cache, try fetching request
              console.log('file is not cached, fetching : ' + e.request.url)
              return fetch(e.request)
          }
          
          // You can omit if/else for console.log & put one line below like this too.
          // return request || fetch(e.request)
          })
    )
  })