self.addEventListener("install", e =>{
    e.waitUnitil(
        caches.open("static").then(cache =>{
            return cache.addAll(["./", "style.css", "logo192R.png"]);
        })
    );
});

self.addEventListener("fetch", e =>{
    // console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response =>{
            return response || fetch(e.request);
        })
    );
});